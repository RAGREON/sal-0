const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName('server').setDescription(`Shows info about the server.`),
  async execute(interaction) {
    await interaction.reply(`Server Name: ${interaction.guild.name}\nMember Count: ${interaction.guild.memberCount}`)
  }
}