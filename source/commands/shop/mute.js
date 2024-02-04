const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');

module.exports = {
  muteFun(client, db) {
    client.on('interactionCreate', async (interaction) => {
      const [actionUser, userId] = interaction.customId.split('_');
     
      if (actionUser === 'muteUser') {
        console.log(userId, actionUser);
        
        db.get(`SELECT virt FROM currency WHERE id = ?`, [userId], async (err, row) => {
          const member = interaction.guild.members.cache.get(userId);
          const virt = row.virt;
         
          if (virt >= 550) {
            if (!member) {
              return interaction.reply('Не удалось найти указанного пользователя')
            }

            db.run(`UPDATE currency SET virt = virt - 550 WHERE id = ?`, [userId]);

            try {
              await member.voice.setMute(true);
              
              setInterval(async () => {
                if (member.voice.channelId) {
                  await member.voice.setMute(false);
                }
              }, 60000)
              
              await interaction.message.delete();
              console.log(`Мут выдан пользователю ${member.displayName}`)
             
              if (!member.voice.mute) {
                console.log(`Пользователь ${member.displayName} размучен`)
              }
            } catch (error) {
              console.log(`Ошибка при муте ${member.displayName}: ${error}`)
              await interaction.reply('Произошла ошибка при муте');
              
            }
          } else {
            const infoIncuficientFunds = new EmbedBuilder()
                .setColor(963684)
                .setTitle(`Заглушить пользователя`)
                .setFields({ name: `Недостаточно средств:`, value: `${Math.abs(virt - 550)}` })

            interaction.reply({ embeds: [infoIncuficientFunds] });
            await interaction.message.delete();
          }
        });
      }
    });
  }
}