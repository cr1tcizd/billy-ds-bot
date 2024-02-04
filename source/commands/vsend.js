const { EmbedBuilder, Client } = require("discord.js");
const { errorMessageSend } = require("../function/errorsend.js");

module.exports = {
  /**
   * 
   * @param {Client} client 
   * @param {*} db 
   */
  vsend(client, db) {
    client.on('messageCreate', message => {
    
      if (message.content.toLowerCase().startsWith('!vsend')) {
        const args = message.content.split(' ').filter(arg => arg !== '');
        const userGiverVirt = message.author;
        const mensionsUser = message.mentions.users;
        const number = !isNaN(Number(args[2]));
    
        if (mensionsUser.size === 1 && number === true && args.length === 3) {;
          const userSendId = message.mentions.users.first();

          db.run(`INSERT OR IGNORE INTO currency (id) VALUES (?)`, [userSendId.id]);

          db.get(`SELECT virt FROM currency WHERE id = ?`, [userGiverVirt.id], (err, row) => {
            const virtGiverUser = row.virt;
            const numberSend = +args[2];
            
            if (userGiverVirt.id === userSendId.id) {
              message.reply(errorMessageSend('Нельзя переводить самому себе', message.author.displayName, message.author.avatarURL()));

            } else if (numberSend > virtGiverUser) {
              message.reply(errorMessageSend('Сумма перевода превышает общую сумму виртов', message.author.displayName, message.author.avatarURL()));

            } else if (numberSend <= 0) {
              message.reply(errorMessageSend('Сумма перевода меньше или равно нулю', message.author.displayName, message.author.avatarURL()));

            } else if (!(numberSend % 1 == 0)) {
              message.reply(errorMessageSend('Сумма перевода должна быть целой', message.author.displayName, message.author.avatarURL()));

            } else {
              db.run(`UPDATE currency SET virt = virt - ${numberSend} WHERE id = ?`, [userGiverVirt.id]);
              db.run(`UPDATE currency SET virt = virt + ${numberSend} WHERE id = ?`, [userSendId.id]);
             
              message.reply({ embeds: [
                new EmbedBuilder()
                  .setAuthor({
                    name: userGiverVirt.displayName,
                    iconURL: userGiverVirt.avatarURL()
                  })
                  .setTitle('Результат перевода:')
                  .setDescription(`${numberSend} вирт было переданно пользователю ${message.mentions.users.first().displayName}`)
                ] });
            }

          });

        } else {
          message.reply({ embeds: [
            new EmbedBuilder()
              .setTitle('Неправильный ввод команды')
              .setDescription('Используйте: ** !vsend <@user> <number> **')
          ] });
        }
      }
    });
  }

}