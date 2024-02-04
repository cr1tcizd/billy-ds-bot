const { EmbedBuilder } = require("@discordjs/builders");
const { Client } = require("discordx");
const { errorMessageSend } = require("../function/errorsend.js");
require("../function/databaseData.js");


        /**
         * 🍆🍆🍆 - 50    от 1 до 5-000-000
         * 🍉🍉🍉 - 100   от 5-000-000 до 8-000-000
         * 🎱🎱🎱 - 300   от 8-000-000 до 9-500-000
         * 🎲🎲🎲 - 1000  от 9-500-000 до 10 000 000
         * Ставка - 10, 50, 100
         * Выигрыш * 2,5
         * 10   │  50   │  100
         * -------------------
         * 50   │  125  │  300
         * 100  │  250  │  600
         * 300  │  700  │  1500
         * 1000 │  2500 │  10000
         *  */ 


module.exports = {
  /**
   * 
   * @param {Client} client 
   * @param {*} db 
   */
  casinoSlots(client, db) {
    client.on('messageCreate', message => {
      
      if (message.content.startsWith('!casino ') && !message.author.bot) {
        const args = message.content.split(' ').filter(arg => arg !== '');
        const userId = message.author.id;
        
        if (args.length === 2 && !isNaN(Number(args[1]))) {
          
          db.run(`INSERT OR IGNORE INTO currency (id) VALUES (?)`, [userId]);
   
          if (+args[1] === 10) {
            result1 = rand();
            result2 = rand();
            result3 = rand();
            const bet = 10;
            
            db.get(`SELECT virt FROM currency WHERE id = ?`, [userId], (err, row) => {
              const virt = row.virt;
              if (virt >= 10) {
                if (+result1.num === 1 && +result2.num === 1 && +result3.num === 1) {
                  totalResult = 'Ваш выйгрыш: ** 50 **';
                  db.run(`UPDATE currency SET virt = virt + 50 WHERE id = ?`, [userId]);
  
                } else if (+result1.num === 2 && +result2.num === 2 && +result3.num === 2) {
                  totalResult = 'Ваш выйгрыш: ** 100 **';
                  db.run(`UPDATE currency SET virt = virt + 100 WHERE id = ?`, [userId]);
  
                } else if (+result1.num === 3 && +result2.num === 3 && +result3.num === 3) {
                  totalResult = 'Ваш выйгрыш: ** 300 **';
                  db.run(`UPDATE currency SET virt = virt + 300 WHERE id = ?`, [userId]);
                  
                } else if (+result1.num === 4 && +result2.num === 4 && +result3.num === 4) {
                  totalResult = 'Ваш выйгрыш: ** 1000 **';
                  db.run(`UPDATE currency SET virt = virt + 1000 WHERE id = ?`, [userId]);
  
                } else {
                  totalResult = 'Вы ничего не выйграли';
                  db.run(`UPDATE currency SET virt = virt - 10 WHERE id = ?`, [userId]);
                };
  
                resultEmbed(result1, result2, result3, virt, totalResult, bet);
              } else {
                message.reply(errorMessageSend('Недостаточно средств', message.author.displayName, message.author.avatarURL()))
              }
            });
          } else if (+args[1] === 50){
            result1 = rand();
            result2 = rand();
            result3 = rand();
            const bet = 50;
            
            db.get(`SELECT virt FROM currency WHERE id = ?`, [userId], (err, row) => {
              const virt = row.virt;
              if (virt >= 50) {
                if (+result1.num === 1 && +result2.num === 1 && +result3.num === 1) {
                  totalResult = 'Ваш выйгрыш: ** 150 **';
                  db.run(`UPDATE currency SET virt = virt + 150 WHERE id = ?`, [userId]);
  
                } else if (+result1.num === 2 && +result2.num === 2 && +result3.num === 2) {
                  totalResult = 'Ваш выйгрыш: ** 250 **';
                  db.run(`UPDATE currency SET virt = virt + 250 WHERE id = ?`, [userId]);
  
                } else if (+result1.num === 3 && +result2.num === 3 && +result3.num === 3) {
                  totalResult = 'Ваш выйгрыш: ** 700 **';
                  db.run(`UPDATE currency SET virt = virt + 700 WHERE id = ?`, [userId]);
                  
                } else if (+result1.num === 4 && +result2.num === 4 && +result3.num === 4) {
                  totalResult = 'Ваш выйгрыш: ** 2500 **';
                  db.run(`UPDATE currency SET virt = virt + 2500 WHERE id = ?`, [userId]);
  
                } else {
                  totalResult = 'Вы ничего не выйграли';
                  db.run(`UPDATE currency SET virt = virt - 50 WHERE id = ?`, [userId]);
                };
  
                resultEmbed(result1, result2, result3, virt, totalResult, bet);
              } else {
                message.reply(errorMessageSend('Недостаточно средств', message.author.displayName, message.author.avatarURL()))
              }
            });

          } else if (+args[1] === 100) {
            result1 = rand();
            result2 = rand();
            result3 = rand();
            const bet = 100;
            
            db.get(`SELECT virt FROM currency WHERE id = ?`, [userId], (err, row) => {
              const virt = row.virt;
              if (virt >= 100) {
                if (+result1.num === 1 && +result2.num === 1 && +result3.num === 1) {
                  totalResult = 'Ваш выйгрыш: ** 300 **';
                  db.run(`UPDATE currency SET virt = virt + 300 WHERE id = ?`, [userId]);
  
                } else if (+result1.num === 2 && +result2.num === 2 && +result3.num === 2) {
                  totalResult = 'Ваш выйгрыш: ** 600 **';
                  db.run(`UPDATE currency SET virt = virt + 600 WHERE id = ?`, [userId]);
  
                } else if (+result1.num === 3 && +result2.num === 3 && +result3.num === 3) {
                  totalResult = 'Ваш выйгрыш: ** 1500 **';
                  db.run(`UPDATE currency SET virt = virt + 1500 WHERE id = ?`, [userId]);
                  
                } else if (+result1.num === 4 && +result2.num === 4 && +result3.num === 4) {
                  totalResult = 'Ваш выйгрыш: ** 10000 **';
                  db.run(`UPDATE currency SET virt = virt + 10000 WHERE id = ?`, [userId]);
  
                } else {
                  totalResult = 'Вы ничего не выйграли';
                  db.run(`UPDATE currency SET virt = virt - 100 WHERE id = ?`, [userId]);
                };
                
                resultEmbed(result1, result2, result3, virt, totalResult, bet);
              } else {
                message.reply(errorMessageSend('Недостаточно средств', message.author.displayName, message.author.avatarURL()));
              } 
              
            });
          } else {
            message.reply(errorMessageSend('Доступный размер ставки: ** 10, 50, 100 **', message.author.displayName, message.author.avatarURL()));
          }
          function rand() {
            const rand = Math.floor(Math.random() * 9999999 + 1);
            if ((Math.floor(Math.random() * 9999999 + 1)) <= 5000000) {
              return {icon:'🍆', num:1};
            } else if ((Math.floor(Math.random() * 9999999 + 1)) <= 8000000) {
              return {icon:'🍉', num:2};
            } else if ((Math.floor(Math.random() * 9999999 + 1)) <= 9500000) {
              return {icon:'🎱', num:3};
            } else {
              return {icon:'🎲', num:4};
            }
          }

          function resultEmbed(result1, result2, result3, virt, totalResult, bet) {
            const resultEmbedInfo = new EmbedBuilder()
              .setAuthor({ name: message.author.displayName, iconURL: message.author.avatarURL() })
              .setColor(15844367)
              .addFields(
                  { name: 'Баланс:', value: `${virt}`, inline: true },
                  { name: ' ', value: ` `, inline: true },
                  { name: 'Ставка:', value: `${bet}`, inline: true },
                  { name: ' ', value: " ", inline: true },
                  { name: ' ', value: " ", inline: true },
                  { name: ' ', value: " ", inline: true },
                  { name: '─│🎰 ** CASINO ** 🎰│─', value: '┌───────────────┐' },
                  { name: '\u200B', value: `│ │${result1.icon}│   │${result2.icon}│   │${result3.icon}│ │` },
                  { name: '\u200B', value: '└───────────────┘' },
                  { name: totalResult, value: ' ' }
              )
            return message.channel.send({ embeds: [resultEmbedInfo] });
          }
        } else {
          message.reply({ embeds: [
            new EmbedBuilder()
              .setTitle('Неправильный ввод команды')
              .setDescription('Используйте: ** !casino <bet> **')
              .setFields({ name: 'Возможнйы размер ставки:', value: '10, 50, 100' })
            ] });  
      } 
      }
    });
  }
}