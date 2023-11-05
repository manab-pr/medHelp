const telegramBot=require('node-telegram-bot-api');
const QR = require('qrcode');
const fs = require('fs') 

require('dotenv').config();

//Token
const TOKEN =process.env.TOKEN;


const bot= new telegramBot(TOKEN,{polling: true})

bot.on('message',(message)=>{
   let chatId =message.from.id;
   const Text =message.text;
   console.log(chatId);

   if(isvalidUrl(Text)){
      QR.toFile('foo.png',Text,(err)=>{
         if(err){
            console.error('Error generating Qr code',err);
         }else{
            bot.sendPhoto(chatId,'foo.png',{caption:'Here is your Qr code',contentType:'image/png'})
            .then(()=>{console.log('Qr code send successfully');
            fs.unlinkSync('foo.png')
         })
           .catch((error)=>{
            console.error('Error Sending QR code',error);

         })

         }

      }

   )  
      
   }
   
   
})

const isvalidUrl=(string)=>{
   const urlRegx= /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/ ;
   return urlRegx.test(string);
}

