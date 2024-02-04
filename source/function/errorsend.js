const { EmbedBuilder } = require('discord.js');

module.exports = {
  errorMessageSend(error, username, avatar) {
    return { embeds: [
      new EmbedBuilder()
        .setAuthor({
          name: username,
          iconURL: avatar
        })
        .setTitle('Ошибка:')
        .setDescription(error)
      ]
    };
  }
}