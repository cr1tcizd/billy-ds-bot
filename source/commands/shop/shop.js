const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const { Client } = require('discordx');
const { errorMessageSend } = require('../../function/errorsend');
// require('./kick.js').kickFun(client,db);
// require('./mute.js').muteFun(client,db);
// require('./muteVoice.js').muteVoice(client,db);


module.exports = {
  /**
   * 
   * @param {Client} client 
   * @param {*} db 
   * @returns 
   */
  shopFun(client, db) {
    client.on('messageCreate', async (message) => {
      if (message.content.toLowerCase() === '!shop') {
        const userId = message.author.id;
        
        db.run(`INSERT OR IGNORE INTO currency (id) VALUES (?)`, [userId.id]);

        db.get(`SELECT virt FROM currency WHERE id = ?`, [userId], (err, row) => {
          const virt = row.virt;
         
          const infoEmbed = new EmbedBuilder()
            .setTitle('Магазин')
            .setColor(963684)
            .setTitle(`Выберете услугу`)
            .addFields(
              { name: 'Баланс:', value: `${virt}` },
              { name: " ", value: " "},
              { name: `Кик:`, value: `1000$`, inline: true },
              { name: `Заглушить:`, value: `550$`, inline: true },
              { name: `Выключить звук:`, value: `750$`, inline: true },
            )
    
          const rowButton = new ActionRowBuilder()
            .addComponents(
              new ButtonBuilder()
                .setCustomId('kick')
                .setLabel('Кик')
                .setStyle('Primary'),
              new ButtonBuilder()
                .setCustomId('mute')
                .setLabel('Заглушить')
                .setStyle('Primary'),
              new ButtonBuilder()
                .setCustomId('muteVoice')
                .setLabel('Мут войс')
                .setStyle('Primary')
            )
        
          const voiceChannel = message.member.voice.channel;
    
          if (!voiceChannel) { 
            message.reply(errorMessageSend('Вы должны находиться в голосовом канале', message.author.displayName, message.author.avatarURL())) 

          } else {
            message.channel.send({ embeds: [infoEmbed], components: [rowButton] });
          }
        });
      }
    });
    return this;
  },
  /**
   * 
   * @param {Client} client 
   * @param {*} db 
   * @returns 
   */
  muteAndKickButton(client, db) {
    client.on('interactionCreate', async (interaction) => {
      const action = interaction.customId;
    
      if (action === 'mute') {
        const voiceChannelId = interaction.member.voice.channelId;
        
        if (voiceChannelId) {
          const userId = interaction.member.user.id;
          
          db.get(`SELECT virt FROM currency WHERE id = ?`, [userId], async (err, row) => {
            const virt = row.virt;

            if (virt >= 550 || interaction.member.roles.cache.has("1190595492338483231")) {
              const voiceChannelData = interaction.guild.channels.cache.get(voiceChannelId);
              const rowButton = new ActionRowBuilder()
              
              voiceChannelData.members.forEach((member) => {
                const buttonMute = new ButtonBuilder()
                  .setCustomId(`muteUser_${member.id}`)
                  .setLabel(member.displayName)
                  .setStyle('Danger')
    
                  rowButton.addComponents(buttonMute);
              });
              
              const infoIncuficientFunds = new EmbedBuilder()
                .setColor(963684)
                .setTitle(`Выберите пользователя для мута:`)

              interaction.reply({ embeds: [infoIncuficientFunds], components: [rowButton] });
              await interaction.message.delete();
            
            } else {
              const infoIncuficientFunds = new EmbedBuilder()
                .setColor(963684)
                .setTitle(`Заглушить пользователя`)
                .setFields({ name: `Недостаточно средств:`, value: `${Math.abs(virt - 550)}` })

              interaction.reply({ embeds: [infoIncuficientFunds] });
            }
          });
        
        } else {
          interaction.reply({ embeds: [
            new EmbedBuilder()
              .setTitle('Ошибка:')
              .setDescription('Голосовой канал пуст')
          ] })
        }
      }
    
      if (action === 'kick') {
        const voiceChannelId = interaction.member.voice.channelId;
        if (voiceChannelId) {
          const userId = interaction.member.user.id;
          
          db.get(`SELECT virt FROM currency WHERE id = ?`, [userId], async (err, row) => {
          const virt = row.virt;
          
          if (virt >= 1000 || interaction.member.roles.cache.has("1190595492338483231")) {
            const voiceChannelData = interaction.guild.channels.cache.get(voiceChannelId);
            const rowButton = new ActionRowBuilder()
           
            voiceChannelData.members.forEach((member) => {
            const buttonKick = new ButtonBuilder()
              .setCustomId(`kickUser_${member.id}`)
              .setLabel(member.displayName)
              .setStyle('Danger')
    
              rowButton.addComponents(buttonKick);
            });
          
            const infoIncuficientFunds = new EmbedBuilder()
                .setColor(963684)
                .setTitle(`Выберите пользователя для кика:`)

            interaction.reply({ embeds: [infoIncuficientFunds], components: [rowButton] });
            await interaction.message.delete();
          } else {
              const infoIncuficientFunds = new EmbedBuilder()
                .setColor(963684)
                .setTitle(`Кикнуть пользователя`)
                .setFields({ name: `Недостаточно средств:`, value: `${Math.abs(virt - 1000)}` })

              interaction.reply({ embeds: [infoIncuficientFunds] });
              await interaction.message.delete();
          }
          });
        } else {
          interaction.reply({ embeds: [
            new EmbedBuilder()
              .setTitle('Ошибка:')
              .setDescription('Голосовой канал пуст')
          ] })
        }
      }

      if (action === 'muteVoice') {
        const voiceChannelId = interaction.member.voice.channelId;
        
        if (voiceChannelId) {
          const userId = interaction.member.user.id;
          
          db.get(`SELECT virt FROM currency WHERE id = ?`, [userId], async (err, row) => {
          const virt = row.virt;
          
          if (virt >= 550 || interaction.member.roles.cache.has("1190595492338483231")) {
            const voiceChannelData = interaction.guild.channels.cache.get(voiceChannelId);
            const rowButton = new ActionRowBuilder()
           
            voiceChannelData.members.forEach((member) => {
            const buttonMuteVoice = new ButtonBuilder()
              .setCustomId(`muteVoiceUser_${member.id}`)
              .setLabel(member.displayName)
              .setStyle('Danger')
    
              rowButton.addComponents(buttonMuteVoice);
            });
          
            const infoIncuficientFunds = new EmbedBuilder()
                .setColor(963684)
                .setTitle(`Выберите кому заглушить звук:`)

            interaction.reply({ embeds: [infoIncuficientFunds], components: [rowButton] });
            await interaction.message.delete();
          } else {
              const infoIncuficientFunds = new EmbedBuilder()
                .setColor(963684)
                .setTitle(`Заглушить звук пользователю`)
                .setFields({ name: `Недостаточно средств:`, value: `${Math.abs(virt - 600)}` })

              interaction.reply({ embeds: [infoIncuficientFunds] });
              await interaction.message.delete();
          }
          });
        } else {
          interaction.reply({ embeds: [
            new EmbedBuilder()
              .setTitle('Ошибка:')
              .setDescription('Голосовой канал пуст')
          ] })
        }
      }

    });  
  }
}