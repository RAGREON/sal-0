const fs = require("fs");
const path = require("path");
const { Client, Events, GatewayIntentBits, Collection } = require("discord.js");
const { token } = require("./config.json");

const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
});

client.once(Events.ClientReady, (readyClient) => {
	console.log("client is ready");
});

client.commands = new Collection();

const foldersPath = path.join(__dirname, "commands");
const commandsFolder = fs.readdirSync(foldersPath);

for (const folder of commandsFolder) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs
		.readdirSync(commandsPath)
		.filter((file) => file.endsWith(".js"));

	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);

		if ("data" in command && "execute" in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(
				`[WARNING]: The command at ${filePath} is missing "name" or "execute" or both.`
			);
		}
	}
}

const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
	.readdirSync(eventsPath)
	.filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);

	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.login(token);
