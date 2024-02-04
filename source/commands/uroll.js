const { EmbedBuilder } = require("discord.js");
const { errorMessageSend } = require("../function/errorsend");
const { Client } = require("discordx");

module.exports = {
  /**
   * 
   * @param {Client} client 
   */
  uroll(client) {
    client.on('messageCreate', async (message) => {
      if (message.content.toLowerCase() === "!uroll") {
        if (!message.member.voice.channel) {
          message.reply(errorMessageSend('Вы должны находиться в голосовом канале', message.author.displayName, message.author.avatarURL()));
          return;
        } 
        const voiceChannel = message.member.voice.channel;
        const members = voiceChannel.members;
        const membersArray = Array.from(members.values());
        const randomMember = membersArray[Math.floor(Math.random() * membersArray.length)];
        
        const infoUrollEmbed = new EmbedBuilder()
          .setFields(
            { name: "Случайный участник:", value: `${randomMember.user.displayName}` }
          )
        message.channel.send({ embeds: [infoUrollEmbed] });
      }
    });
  }
}
