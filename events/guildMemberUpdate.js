const moment = require('moment');
const {RichEmbed} = require('discord.js');

module.exports = (client, oldMember, newMember) => {
	const {channelIDs, guildID, messageIDs, roleIDs} = client.config;

	if (oldMember.roles.has(roleIDs.member) && newMember.roles.has(roleIDs.hwMember)) {
		const messageReaction = {
			emoji: {name: '🇲'},
			message: {id: messageIDs.memberToggle}
		};
		const userObj = {
			id: oldMember.id
		};
		const guildObj = client.guilds.get(guildID);
		const welcomeChannel = guildObj.channels.get(channelIDs.welcome);

		welcomeChannel.fetchMessage(messageIDs.memberToggle)
			.then(message => {
				message.reactions.forEach(reaction => {
					if (reaction.emoji.name === messageReaction.emoji.name) {
						reaction.remove(oldMember.id);
					}
				});
			});

		client.emit('messageReactionRemove', messageReaction, userObj);
	}

	if (oldMember.roles.has(roleIDs.hwMember) && newMember.roles.has(roleIDs.member)) {
		const messageReaction = {
			emoji: {name: '🇭'},
			message: {id: messageIDs.memberToggle}
		};
		const userObj = {
			id: oldMember.id
		};
		const guildObj = client.guilds.get(guildID);
		const welcomeChannel = guildObj.channels.get(channelIDs.welcome);

		welcomeChannel.fetchMessage(messageIDs.memberToggle)
			.then(message => {
				message.reactions.forEach(reaction => {
					if (reaction.emoji.name === messageReaction.emoji.name) {
						reaction.remove(oldMember.id);
					}
				});
			});

		client.emit('messageReactionRemove', messageReaction, userObj);
	}

	if (oldMember.roles.has(roleIDs.lfg) && newMember.roles.has(roleIDs.noLfg)) {
		const messageReaction = {
			emoji: {name: '❗'},
			message: {id: messageIDs.lfgToggle}
		};
		const userObj = {
			id: oldMember.id
		};
		const guildObj = client.guilds.get(guildID);
		const getRoleChannel = guildObj.channels.get(channelIDs.getRole);

		getRoleChannel.fetchMessage(messageIDs.lfgToggle)
			.then(message => {
				message.reactions.forEach(reaction => {
					if (reaction.emoji.name === messageReaction.emoji.name) {
						reaction.remove(oldMember.id);
					}
				});
			});

		client.emit('messageReactionRemove', messageReaction, userObj);
	}

	if (oldMember.roles.has(roleIDs.noLfg) && newMember.roles.has(roleIDs.lfg)) {
		const messageReaction = {
			emoji: {name: '🚫'},
			message: {id: messageIDs.lfgToggle}
		};
		const userObj = {
			id: oldMember.id
		};
		const guildObj = client.guilds.get(guildID);
		const getRoleChannel = guildObj.channels.get(channelIDs.getRole);

		getRoleChannel.fetchMessage(messageIDs.lfgToggle)
			.then(message => {
				message.reactions.forEach(reaction => {
					if (reaction.emoji.name === messageReaction.emoji.name) {
						reaction.remove(oldMember.id);
					}
				});
			});

		client.emit('messageReactionRemove', messageReaction, userObj);
	}

	if (oldMember.displayName !== newMember.displayName) {
		const nicknameEmbed = new RichEmbed()
			.setAuthor(newMember.user.username + '#' + newMember.user.discriminator, newMember.user.avatarURL)
			.setTitle('Nickname Change')
			.setColor('#0098DB')
			.addField('Before', `${oldMember.displayName}`, true)
			.addField('After', `${newMember.displayName}`, true)
			.setFooter(moment().format('h:mm a, Do MMMM YYYY'));

		client.channels.get(channelIDs.adminLogging).send(nicknameEmbed);
	}
};
