from flask import Flask, jsonify, request
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch
import mysql.connector

from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Betöltjük a DialoGPT modellt és a hozzá tartozó tokenizert
model_name = "tuned"
model = AutoModelForCausalLM.from_pretrained(model_name)
tokenizer = AutoTokenizer.from_pretrained(model_name)

max_history_length = 33
chat_history_ids = None  # Inicializáljuk a beszélgetési előzményeket

# Adatbázis kapcsolódás
conn = mysql.connector.connect(
    host="localhost",
    user="root",  # Felhasználónév
    password="",  # Jelszó
    database="auth"  # Adatbázis neve
)
c = conn.cursor()

@app.route("/generate_response", methods=["POST"])
def generate_response():
    try:
        data = request.json
        user_input = data["user_input"]

        # Az input kódolása és hozzáadása az end of string tokenhez
        input_ids = tokenizer.encode(user_input + tokenizer.eos_token, return_tensors="pt")

        # A bot válasz létrehozása
        bot_input_ids = torch.cat([chat_history_ids[:, -max_history_length:], input_ids], dim=-1) \
            if chat_history_ids is not None else input_ids
        
        output = model.generate(
            bot_input_ids,
            max_length=150,
            num_beams=1,
            do_sample=True,
            top_p=0.95,
            top_k=100,
            temperature=1,
            pad_token_id=tokenizer.eos_token_id
        )

        # Az output dekódolása
        decoded_output = tokenizer.decode(output[0], skip_special_tokens=True)

        # A válaszban csak azokat a részeket tartjuk meg, amelyek nem egyeznek meg a felhasználó bemenetével
        trimmed_response = decoded_output.replace(user_input, "").strip()

        # Visszatérés a generált válasszal
        return jsonify({"response": trimmed_response})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/get_product_info", methods=["POST"])
def get_product_info():
    try:
        data = request.json
        product_name = data["product_name"]

        # Lekérdezés az adatbázisból a részleges egyezésű terméknevek megszerzéséhez
        c.execute("SELECT Name, Price, IsItInStock FROM Products WHERE Name LIKE %s", ('%' + product_name + '%',))
        rows = c.fetchall()
        
        if rows:
            # Ha találtunk részleges egyezésű termékneveket, visszatérünk a lehetőségek listájával
            options = [{"name": row[0], "price": row[1], "in_stock": bool(row[2])} for row in rows]
            return jsonify({"options": options})
        else:
            return jsonify({"error": "No matching products found"}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    
@app.route("/get_selected_product_info", methods=["POST"])
def get_selected_product_info():
    try:
        data = request.json
        selected_product_name = data["selected_product_name"]

        # Lekérdezés az adatbázisból a kiválasztott termék adatainak megszerzéséhez
        c.execute("SELECT Price, IsItInStock FROM Products WHERE Name=%s", (selected_product_name,))
        row = c.fetchone()
        
        if row:
            price = row[0]
            is_in_stock = bool(row[1])

            # Válasz összeállítása
            response = {"price": price, "in_stock": is_in_stock}
            return jsonify(response)
        else:
            return jsonify({"error": "Selected product not found"}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 500



if __name__ == "__main__":
    app.run(debug=True)