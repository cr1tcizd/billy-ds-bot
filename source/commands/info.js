const { EmbedBuilder, Client } = require('discord.js');

module.exports = {
  /**
   * 
   * @param {Client} client 
   * @param {*} db 
   */
  info(client, db) {
    client.on('messageCreate', message => {
      
      if (message.content.toLowerCase().startsWith('!info ') || message.content.toLowerCase() === '!info') { 
        const args = message.content.split(' ').filter(arg => arg !== '');
        const mensionsUser = message.mentions.users;

        if ((mensionsUser.size === 1 && args.length === 2) || args.length === 1) {
          const userId = args.length === 1 ? message.author : message.mentions.users.first();
    
          db.run(`INSERT OR IGNORE INTO currency (id) VALUES (?)`, [userId.id]);
          db.run(`INSERT OR IGNORE INTO users (id) VALUES (?)`, [userId.id]);
          db.run(`INSERT OR IGNORE INTO message (id) VALUES (?)`, [userId.id]);
          db.get(`SELECT
                  (SELECT message_count FROM message WHERE id = ?) AS message_count,
                  (SELECT lvl FROM message WHERE id = ?) AS lvl,
                  (SELECT virt FROM currency WHERE id = ?) AS virt,
                  (SELECT total_time FROM users WHERE id = ?) AS total_time
                `, [userId.id, userId.id, userId.id, userId.id], (err, row) => {
            const messageCount = row.message_count;
            const virtCount = row.virt;
            const totalTime = row.total_time;
            const totalMin = (Math.floor(totalTime / 60) % 60);
            const totalHours = Math.floor(totalTime / 60 / 60);
            const totalSec = totalTime % 60;
            const lvl = row.lvl;
            let min;
            let sec;
            let h;
            let nullHourse = totalHours;

            if (totalMin % 10 === 1) {
              min = 'минуту';
            } else if (totalMin % 10 > 1 && totalMin % 10 < 5) {
              min = 'минуты'
            } else { min = 'минут' }
    
            if (totalSec % 10 === 1) {
              sec = 'секунду';
            } else if (totalSec % 10 > 1 && totalSec % 10 < 5) {
              sec = 'секунды'
            } else { sec = 'секунд' }
    
            if (totalHours !== 0) {
              if (totalHours !== 11 && totalHours % 10 === 1) {
                h = 'час';
              } else if ((totalHours < 11 || totalHours > 15) && totalHours % 10 > 1 && totalHours % 10 < 5) { // 12 < 11 и 12 > 15 net
                h = 'часа'
              } else { h = 'часов' }
          } else { 
              h = "";
              nullHourse = ''; 
            }
            
            const infoEmbed = new EmbedBuilder()
                  .setColor(963684)
                  .setAuthor({ name: message.author.displayName, iconURL: message.author.avatarURL() })
                  .setTitle(`Информация о пользователе ${userId.displayName}`)
                  .setThumbnail(userId.avatarURL())
                  .addFields(
                    { name: `Уровень:\t\t`, value: `${lvl}`, inline: true },
                    { name: `Количество виртов`, value: `${virtCount}`, inline: true },
                    { name: ' ', value: ' \n ' },
                    { name: `Количество сообщений:\t\t`, value: `${messageCount}`, inline: true },
                    { name: `В головых чатах:`, value: `${nullHourse} ${h} ${totalMin} ${min} ${totalSec} ${sec}`, inline: true },
                  )
    
            message.channel.send({ embeds: [infoEmbed] })
          })
        } else {
          
          message.reply({ embeds: [
            new EmbedBuilder()
              .setTitle('Неправильный ввод команды')
              .setDescription('Используйте: ** !info <@user> **')
          ] });
          
        }
      }
    })
  }
}