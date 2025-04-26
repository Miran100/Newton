from flask import Flask, request
import telegram

TOKEN = "YOUR_BOT_TOKEN_HERE"
bot = telegram.Bot(token=TOKEN)

app = Flask(__name__)

@app.route('/' + TOKEN, methods=['POST'])
def webhook():
    update = telegram.Update.de_json(request.get_json(force=True), bot)
    if update.message and update.message.text == "/start":
        keyboard = [[telegram.InlineKeyboardButton("Start Mining!", web_app=telegram.WebAppInfo(url="https://newtonmine.vercel.app"))]]
        reply_markup = telegram.InlineKeyboardMarkup(keyboard)
        bot.send_message(chat_id=update.message.chat_id, text="Welcome to Newton Miner!", reply_markup=reply_markup)
    return 'ok'

@app.route('/')
def index():
    return "Newton Miner Bot is Running."

if __name__ == "__main__":
    app.run(port=5000)