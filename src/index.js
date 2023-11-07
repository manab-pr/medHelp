const telegramBot = require("node-telegram-bot-api");
const QR = require("qrcode");
const fs = require("fs");
require("dotenv").config();

const TOKEN = process.env.TOKEN;

const bot = new telegramBot(TOKEN, { polling: true });

bot.on("message", (message) => {
  let name = message.from.first_name;
  console.log(name);
  let chatId = message.from.id;
  const Text = message.text.toLowerCase();

  if (
    Text === "hey" ||
    Text === "hii" ||
    Text === "hello" ||
    Text === "start"
  ) {
    bot.sendMessage(
      chatId,
      `🔹Hii ${name}\n🔹To get to know the bot enter: /start\n🔹To know how to command enter: /help\n🔹And provide me a link to get the QR`,
      {
        reply_to_message_id: message.message_id,
      }
    );
  }
});

bot.onText(/\/start/, (message) => {
  let chatId = message.from.id;
  let name = message.from.first_name;
  bot.sendMessage(
    chatId,
    `Hi👋 ${name}, I am a QR Generator Bot, I am here to make any of your url to QR`,
    {
      reply_to_message_id: message.message_id,
    }
  );
});
bot.onText(/\/help/, (message) => {
  let chatId = message.from.id;
  let name = message.from.first_name;
  bot.sendMessage(
    chatId,
    `Hi👋 ${name}, just remember whatever link u provide it should have 'https://' at the beginning`,
    {
      reply_to_message_id: message.message_id,
    }
  );
});

bot.on("message", (message) => {
  let chatId = message.from.id;
  let name = message.from.first_name;
  const Text = message.text;
  console.log(name);

  if (isvalidUrl(Text)) {
    QR.toFile("foo.png", Text, (err) => {
      if (err) {
        console.error("Error generating Qr code", err);
      } else {
        bot
          .sendPhoto(chatId, "foo.png", {
            caption: "Here is your Qr code 😁",
            contentType: "image/png",
            reply_to_message_id: message.message_id,
          })
          .then(() => {
            console.log("Qr code send successfully");
            fs.unlinkSync("foo.png");
          })
          .catch((error) => {
            console.error("Error Sending QR code", error);
          });
      }
    });
  }
});

const isvalidUrl = (string) => {
  const urlRegx =
    /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
  return urlRegx.test(string);
};
