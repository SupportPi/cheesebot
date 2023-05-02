const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rick')
		.setDescription('Set\'s a member\'s nick to their Username.')
		.addUserOption(target=>
			target
			.setName("target")
			.setDescription("target")
			.setRequired(true))
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction) {
		const member = interaction.options.getMember('target');
        const nick = member.user.username;

		const targetUserRolePosition = member.roles.highest.position;
		const requestUserRolePosition = interaction.member.roles.highest.position;
		const botRolePostition = interaction.guild.members.me.roles.highest.position;

		if(targetUserRolePosition >= requestUserRolePosition) {
			await interaction.reply("You can't modify their nickname...")
			return;
		}
		if(targetUserRolePosition >= botRolePostition) {
			await interaction.reply("I can't modify their nickname...")
			return;
		}

		if (nick.length > 32) 
			return interaction.reply({content: `Nickname length cannot exceed 32 characters!` });
	
		member.setNickname(nick); 
		return interaction.reply({ content: `${member.user.username}'s nickname reset! `});
	},
};