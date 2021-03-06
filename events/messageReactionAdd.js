const messageMap = require('../utils/reactRoleMap');

module.exports = (client, reaction, user) => {
	const {guildID} = client.config;
	const guildObj = client.guilds.get(guildID);

	for (const messageMapKey of Object.keys(messageMap)) {
		// Message ID is stored as string since it's too big a number to store
		if (messageMapKey === reaction.message.id.toString()) {
			for (const roleMap of messageMap[messageMapKey]) {
				if (reaction.emoji.name === roleMap.emoji) {
					guildObj.members.forEach((member) => {
						if (member.id === user.id) {
							const roleToAdd = guildObj.roles.find(r => r.name === roleMap.role);

							member.addRole(roleToAdd);
							if (roleToAdd.name === 'Members' || roleToAdd.name === 'HW Members') {
								member.addRole(guildObj.roles.find(r => r.name === 'LFG'));
							}
						}
					});
				}
			}
		}
	}
};
