const moment = require('moment');
const {RichEmbed} = require('discord.js');
const {bannedWords} = require('../utils/profanities.json');
const {mutedUsers} = require('../utils/muted.json');
const {getDiscordId} = require('../utils/functions.js');

module.exports = (client, message) => {
	const {prefix, channelIDs, roleIDs} = client.config;
	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();
	const command = client.commands.get(commandName);

	for (const mutedUser of mutedUsers) {
		if (message.author.id === mutedUser) {
			message.delete();
			break;
		}
	}

	for (const bannedWord of bannedWords) {
		if (message.content.includes(bannedWord) && !message.author.bot) {
			if (message.content.startsWith('!unbanword') && message.member.roles.has(roleIDs.mod)) {
				break;
			}

			message.delete();

			const bannedWordUseEmbed = new RichEmbed()
				.setAuthor(getDiscordId(message.author), message.author.avatarURL)
				.setTitle('Banned word used UwU')
				.setColor('#FF0000')
				.addField('Location', `${message.channel}`)
				.addField('Message', `${message.content}`)
				.setFooter(moment().format('h:mm a, Do MMMM YYYY'));

			client.channels.get(channelIDs.adminLogging).send(bannedWordUseEmbed);
			break;
		}
	}

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	if (message.content === prefix) {
		message.channel.send('!!');
	}

	if (!client.commands.has(commandName)) return;

	try {
		if (command.guildOnly && message.channel.type !== 'text') {
			message.reply('I can\'t execute that command inside DMs!');
		} else if (command.modOnly && !message.member.roles.has(roleIDs.mod)) {
			return;
		} else {
			command.execute(message, args);
		}
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
};
