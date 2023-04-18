import request from 'request';
import TelegramBot from 'node-telegram-bot-api';


const TOKEN = '5999513810:AAF3sXHtQKs8N5lsizMckusFHAO1sTLN4Rs';
let contagem_gren = 0;
let contagem_loss = 0;
let contagemvitoria = 0;
const bot = new TelegramBot(TOKEN);
const chatId = '5300684836';

let lastMsg = "";
let msgEnviada = false; // Variável de controle para saber se a mensagem já foi enviada
let resultadoAnterior = "";
let msg = "";
let msg2 = "";
let banca = 30;
let entradas = 0;
let porcentagemAcerto = 0;
let pocentagemErro = 0;
  // Função que envia a mensagem
async function resultado(num) {
  msg2 = msg;
  
  const lastFiveColors = num.slice(0, 3).join(',');
  let sincocores = num.slice(0, 4).join(',');
   if (lastFiveColors === 'Preto,Vermelho,Vermelho') {
    msg = '▶️ APOSTAR NO 🔴VERMELHO';
    if(msg2 !== msg){
      bot.sendMessage(chatId, msg);
      entradas++;
    }
   }else if(sincocores === 'Vermelho,Preto,Vermelho,Vermelho'){
    msg = '✅✅✅💚WIN NA COR (🔴)';
    if(msg2 !== msg){
      bot.sendMessage(chatId, msg);
      contagemvitoria++;
      banca = banca+5;
      bot.sendMessage(chatId,`Banca atual R$:${banca}`);
      const porcentagemAcerto = ((contagemvitoria / entradas) * 100).toFixed(2);
      bot.sendMessage(chatId,`:${porcentagemAcerto}% de acerto`)
    }
   }else if( sincocores === 'Preto,Preto,Vermelho,Vermelho'){
    msg = '💔💔Loss💔💔!';
    if(msg2 !== msg){
      bot.sendMessage(chatId, msg);
      contagem_loss++;
      banca = banca-5;
      bot.sendMessage(chatId,`Banca atual R$:${banca}`)
      const pocentagemErro = ((contagem_loss / entradas) * 100).toFixed(2);
      bot.sendMessage(chatId,`:${pocentagemErro}% de Erro`)
    }
   }else if(sincocores === 'Branco,Preto,Vermelho,Vermelho'){
    msg = '💔💔Loss💔💔!';
    if(msg2 !== msg){
      bot.sendMessage(chatId, msg);
      contagem_loss++;
      banca = banca-5;
      bot.sendMessage(chatId,`Banca atual R$:${banca}`);
      const pocentagemErro = ((contagem_loss / entradas) * 100).toFixed(2);
      bot.sendMessage(chatId,`:${pocentagemErro}% de Erro`);
    }
   }


   if(lastFiveColors === 'Vermelho,Preto,Preto'){
    msg = '▶️ APOSTAR NO ⚫️Preto';
    if(msg2 !== msg){
      bot.sendMessage(chatId, msg);
      entradas++;
    }
   }else if(sincocores === 'Preto,Vermelho,Preto,Preto'){
    msg = '✅✅✅💚WIN NA COR (⚫️)';
    if(msg2 !== msg){
      bot.sendMessage(chatId, msg);
      contagemvitoria++;
      banca = banca+5;
      bot.sendMessage(chatId,`Banca atual R$:${banca}`);
      const porcentagemAcerto = ((contagemvitoria / entradas) * 100).toFixed(2);
      bot.sendMessage(chatId,`:${porcentagemAcerto}% de acerto`);
    }
   }else if(sincocores === 'Vermelho,Vermelho,Preto,Preto'){
     msg = '💔💔Loss💔💔!';
     if(msg2 !== msg){
      bot.sendMessage(chatId, msg);
      contagem_loss++;
      banca = banca-5;
      bot.sendMessage(chatId,`Banca atual R$:${banca}`);
      const pocentagemErro = ((contagem_loss / entradas) * 100).toFixed(2);
      bot.sendMessage(chatId,`:${pocentagemErro}% de Erro`);
    }
   }else if(sincocores === 'Branco,Vermelho,Preto,Preto'){
    msg = '💔💔Loss💔💔!';
    if(msg2 !== msg){
      bot.sendMessage(chatId, msg);
      contagem_loss++;
      banca = banca-5;
      bot.sendMessage(chatId,`Banca atual R$:${banca}`);
      const pocentagemErro = ((contagem_loss / entradas) * 100).toFixed(2);
      bot.sendMessage(chatId,`:${pocentagemErro}% de Erro`);
    }
   }
}


function translateColor(val) {
  if (val === 1) {
    return 'Vermelho';
  } else if (val === 2) {
    return 'Preto';
  } else if (val === 0) {
    return 'Branco';
  } else {
    return '';
  }
}

setInterval(() => {
  const url = 'https://blaze.com/api/roulette_games/recent';

  request(url, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      const data = JSON.parse(body);
      const ray = data.map((item) => translateColor(item.color));
      resultado(ray);
    }
  });
}, 5000);