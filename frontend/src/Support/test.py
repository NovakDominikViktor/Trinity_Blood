from transformers import GPT2Tokenizer, GPT2LMHeadModel

def main():
    # Load fine-tuned DialoGPT model and tokenizer
    model_path = "./trainagain"
    tokenizer = GPT2Tokenizer.from_pretrained(model_path)
    model = GPT2LMHeadModel.from_pretrained(model_path)

    # Activate interaction loop
    while True:
        # Get user input
        user_input = input("You: ")

        # Encode user input and generate response
        input_ids = tokenizer.encode(user_input, return_tensors="pt")
        response_ids = model.generate(input_ids, max_length=1000, pad_token_id=tokenizer.eos_token_id)

        # Decode and print response
        bot_response = tokenizer.decode(response_ids[0], skip_special_tokens=True)
        print("Bot:", bot_response)

        # Check for exit command
        if user_input.lower() == "exit":
            print("Exiting...")
            break

if __name__ == "__main__":
    main()
