const { EmbedBuilder, Embed } = require('discord.js')

module.exports = {
  coinflipFun(client) {
    client.on('messageCreate', message => {
     
      if (message.content.toLowerCase() === "!coinflip") {
        const result = (Math.random() < 0.5) ? 'Решка' : 'Орел';
        randomPictures = Math.floor(1 + Math.random() * 3)
        const url = (randomPictures === 1) ? `https://media1.tenor.com/m/-Ty-f7Ld7skAAAAd/anime-coinflip.gif` : 
                    (randomPictures === 2) ? `https://media1.tenor.com/m/Kjr1730G208AAAAC/bonne-nuit.gif` : 
                                           `https://media1.tenor.com/m/3zKTl0O-9eQAAAAC/hn2i-hn2i_.gif`

        message.channel.send({ embeds: [
          new EmbedBuilder()
            .setTitle('Результат:')
            .setDescription(result)
            .setImage(url)
        ] });
      }
    });
  }
}