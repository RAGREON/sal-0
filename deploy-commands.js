const fs = require("fs");
const path = require("path");
const { REST, Routes } = require("discord.js");
const { token, clientId, guildId } = require("./config.json");

const commands = [];

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
			commands.push(command.data.toJSON());
		} else {
			console.log(
				`[WARNING]: The command at ${filePath} is missing "name" or "execute" or both.`
			);
		}
	}
}

const rest = new REST().setToken(token);

(async () => {
	try {
		console.log(
			`Started refreshing ${commands.length} application (/) commands`
		);

		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands }
		);

		console.log(
			`Successfully reloaded ${data.length} application (/) commands`
		);
	} catch (err) {
		console.error(`[ERROR]: application (/) commands deployment\n${err}`);
	}
})();
