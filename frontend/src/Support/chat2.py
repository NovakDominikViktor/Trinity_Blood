from flask import Flask, jsonify, request
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Betöltjük a DialoGPT modellt és a hozzá tartozó tokenizert
model_name = "microsoft/DialoGPT-medium"
model = AutoModelForCausalLM.from_pretrained(model_name)
tokenizer = AutoTokenizer.from_pretrained(model_name)

max_history_length = 33
chat_history_ids = None  # Inicializáljuk a beszélgetési előzményeket

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
            max_length=1000,
            num_beams=1,
            do_sample=True,
            top_p=0.95,
            top_k=5,
            temperature=0.7,
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


if __name__ == "__main__":
    app.run(debug=True)
