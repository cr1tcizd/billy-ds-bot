const { EmbedBuilder } = require('discord.js');
const { Client } = require('discordx');
const { errorMessageSend } = require('../../function/errorsend');

module.exports = {
  /**
   * 
   * @param {Client} client 
   * @param {*} db 
   */
  muteVoice(client, db) {
    client.on('interactionCreate', async (interaction) => {
      const [actionUser, userId] = interaction.customId.split('_');
     
      if (actionUser === 'muteVoiceUser') {
        console.log(userId, actionUser);
        
        db.get(`SELECT virt FROM currency WHERE id = ?`, [userId], async (err, row) => {
          const member = interaction.guild.members.cache.get(userId);
          const virt = row.virt;
         
          if (virt >= 600) {
            if (!member) {
              return interaction.reply('Не удалось найти указанного пользователя')
            }

            db.run(`UPDATE currency SET virt = virt - 600 WHERE id = ?`, [userId]);

            try {
              await member.voice.setDeaf(true, "услуга магазина");
              
              setInterval(async () => {
                if (member.voice.channelId) {
                  await member.voice.setDeaf(false);
                }
              }, 60000)
              
              await interaction.message.delete();
              console.log(`Мут выдан пользователю ${member.displayName}`)
             
              if (!member.voice.deaf) {
                console.log(`Пользователь ${member.displayName} размучен`)
              }
            } catch (error) {
              console.log(`Ошибка при муте ${member.displayName}: ${error}`)
              await interaction.reply(errorMessageSend('Ошибка при муте', member.displayName, member.avatarURL()));
            }
          } else {
            const infoIncuficientFunds = new EmbedBuilder()
                .setColor(963684)
                .setTitle(`Заглушить пользователя`)
                .setFields({ name: `Недостаточно средств:`, value: `${Math.abs(virt - 600)}` })

            interaction.reply({ embeds: [infoIncuficientFunds] });
            await interaction.message.delete();
          }
        });
      }
    });
  }
}