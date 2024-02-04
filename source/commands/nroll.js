const { EmbedBuilder } = require('discord.js');

module.exports = {
  nrollFunction(client) {
    client.on('messageCreate', message => {
      
      if (message.content.toLowerCase() === "!nroll") {

        message.reply({ embeds: [
          new EmbedBuilder()
            .setAuthor({ name: message.author.displayName, iconURL: message.author.avatarURL() })
            .setFields({ name: 'Случайное число:', value: `${Math.round(Math.random()*100)}` })
          ] })
      }
    });
  }
  
};