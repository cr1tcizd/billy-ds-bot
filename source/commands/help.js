const { EmbedBuilder, Client } = require("discord.js");

module.exports = {
  /**
   * Типизирование клиента через комментарий
   * @param {Client} client 
   */
  help(client) {
    client.on('messageCreate', message => {
      if (message.content.toLowerCase() === "!help") {
        const helpInfoEmbend = new EmbedBuilder()
          .setTitle('Команды бота:')
          .setThumbnail(message.guild.iconURL())
          .addFields(
            { name: " ", value: `** !info <@user>** информация о пользователе` },
            { name: " ", value: `** !shop: ** магазин` },
            { name: " ", value: `** !casino <bet>: ** слоты на виртуальную валюту (ставка: 10, 50, 100)` },
            { name: " ", value: `** !vsend <@user> <number>: ** передать валюту` },
            { name: " ", value: `** !uroll: ** рандомайзер пользователей` },
            { name: " ", value: `** !nroll: ** рандомайзер чисел от 1 до 100` },
            { name: " ", value: `** !coinflip: ** орел-решка` },
          )
        message.channel.send({ embeds: [helpInfoEmbend] })
      }
    });
  }
}