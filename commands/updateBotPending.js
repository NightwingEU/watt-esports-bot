const GoogleSpreadsheet = require('google-spreadsheet');

module.exports = {
	name: 'update',
	description: 'Checks all members on pending tab and verifies if they are paying members',
	guildOnly: true,
	modOnly: true,
	usage: 'update',
	execute(message) {
		const {guildID, roleIDs, spreadsheetID, spreadsheetConfig} = message.client.config;
		const spreadsheet = new GoogleSpreadsheet(spreadsheetID);

		if (message.member.roles.has(roleIDs.modRole)) {
			return;
		}

		spreadsheet.useServiceAccountAuth(spreadsheetConfig, () => {
			spreadsheet.getRows(2, (err, botPendingRows) => {
				spreadsheet.getRows(1, (err, verifiedRows) => {
					for (const botPendingRow of botPendingRows) {
						for (const verifiedRow of verifiedRows) {
							if (botPendingRow.matriculationnumber === verifiedRow.matriculationnumber) {
								const guildObj = message.client.guilds.get(guildID);

								guildObj.members.forEach((member) => {
									if (member.id === botPendingRow.discordid) {
										verifiedRow.discordname = member.user.username + '#' + member.user.discriminator;
										verifiedRow.updated = 'Yes';
										verifiedRow.save();
										member.addRole(roleIDs.socMember);
									}
								});

								botPendingRow.del();
							}
						}
					}
				});
			});
		});
	},
};
