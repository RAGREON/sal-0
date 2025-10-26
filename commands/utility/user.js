const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName('user').setDescription(`Shows user's information.`),
  async execute(interaction) {
    await interaction.reply(`This command has been invoked by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}`)
  }
}