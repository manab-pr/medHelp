const telegramBot=require('node-telegram-bot-api');

require('dotenv').config();

//Token
const TOKEN =process.env.TOKEN;


const bot= new telegramBot(TOKEN,{polling: true})

bot.on('message',(message)=>{
   let chatId =message.from.id;
   const photopath='.\Images\pexels-dat-vu-mm-17986565.jpg'
   
   if(message.text.toLowerCase()=="hey"){
    bot.sendMessage(chatId,'What is your name?')
   }
   else{
    bot.sendMessage(chatId,`Welcome to Med Help ${message.text}`)

   }

  
})

// bot.onText(/\/Hello/,(msg)=>{
//    const chatId=msg.from.id;
//    bot.sendMessage(chatId,'Hey,I am here to assist you')
// })
