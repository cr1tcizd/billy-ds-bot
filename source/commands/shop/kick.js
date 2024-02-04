const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');

module.exports = {
  kickFun(client, db) {
    client.on('interactionCreate', async (interaction) => {
      const [actionUser, userId] = interaction.customId.split('_');

      if (actionUser === 'kickUser') {
        console.log(userId, actionUser);
        
        db.get(`SELECT virt FROM currency WHERE id = ?`, [userId], async (err, row) => {
          const virt = row.virt;
          const member = interaction.guild.members.cache.get(userId);
          
          if (!member) {
            return interaction.reply('Не удалось найти указанного пользователя')
          }
          
          if (virt >= 1000) {
            db.run(`UPDATE currency SET virt = virt - 1000 WHERE id = ?`, [userId])
            
            try {
              await member.voice.setChannel(null);
              await interaction.message.delete();
              console.log(` ${member.displayName} был кикнут с сервера`)
            } catch (error) {
              console.log(`Ошибка при кике ${member.displayName}: ${error}`)
              await interaction.reply('Произошла ошибка при муте');
            }
          } else {
              const infoIncuficientFunds = new EmbedBuilder()
                .setColor(963684)
                .setTitle(`Кикнуть пользователя`)
                .setFields({ name: `Недостаточно средств:`, value: `${Math.abs(virt - 1000)}` })

              interaction.reply({ embeds: [infoIncuficientFunds] });
              await interaction.message.delete();
          }
        });
      }
    })
  }
}