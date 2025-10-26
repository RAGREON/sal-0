const { Events, MessageFlags } = require("discord.js");

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(
				`[NOT FOUND]: ${interaction.commandName}, command not found`
			);
			return;
		}

    try {
      await command.execute(interaction)
    } catch (err) {
      console.error(`[ERROR]: ${interaction.commandName} failed to execute command\n${err}`)

      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: 'There was an error executing the command :(',
          flags: MessageFlags.Ephemeral
        })
      } else {
        await interaction.reply({
          content: 'There as an error executing the command',
          flags: MessageFlags.Ephemeral
        })
      }
    }
	},
};
