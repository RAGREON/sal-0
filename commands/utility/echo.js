const { SlashCommandBuilder, MessageFlags } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("echo")
		.setDescription("Echoes the user's text")
		.addStringOption((option) =>
			option.setName("input").setDescription("Text to echo")
		),
  async execute(interaction) {
    const text = interaction.options.getString('input')

    await interaction.reply({
      content: text,
      flags: MessageFlags.Ephemeral
    })
  }
};