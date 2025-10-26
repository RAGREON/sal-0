const {
	joinVoiceChannel,
	createAudioPlayer,
	createAudioResource,
	StreamType,
} = require("@discordjs/voice");
const {
	SlashCommandBuilder,
	MessageFlags,
} = require("discord.js");
const path = require('path')

module.exports = {
	data: new SlashCommandBuilder()
		.setName("join")
		.setDescription("Joins described voice channel")
		.addChannelOption((option) =>
			option.setName("voice-channel").setDescription("Channel to join")
		),

	async execute(interaction) {
		try {
			const channel = interaction.options.getChannel("voice-channel");

			const connection = joinVoiceChannel({
				channelId: channel.id,
				guildId: interaction.guild.id,
				adapterCreator: interaction.guild.voiceAdapterCreator,
			});

			if (!connection) {
				await interaction.reply({
					content: `There was an error joining the voice channel`,
					flags: MessageFlags.Ephemeral,
				});
			}

			const player = createAudioPlayer();
			const resource = createAudioResource(
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        { inputType: StreamType.Arbitrary }
			);

			connection.subscribe(player);

			player.play(resource);

      player.on('error', (error) => {
        console.error(error)
      })
		} catch (err) {
			console.error(`[ERROR]: Failed to join voice channel\n${err}`);
		}
	},
};
