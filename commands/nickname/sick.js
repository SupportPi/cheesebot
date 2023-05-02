const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('sick')
		.setDescription('Set\'s a Member\'s nick')
		.addUserOption(target=>
			target
			.setName("target")
			.setDescription("target")
			.setRequired(true))
        .addStringOption(nick=>
            nick
            .setName('nick')
            .setDescription('nick to set')
            .setRequired(true))
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction) {
		const nick = interaction.options.getString('nick').replace('@', '@​\u200b');
		const member = interaction.options.getMember('target');
		
		const targetUserRolePosition = member.roles.highest.position;
		const requestUserRolePosition = interaction.member.roles.highest.position;
		const botRolePostition = interaction.guild.members.me.roles.highest.position;

		if(targetUserRolePosition >= requestUserRolePosition) {
			await interaction.reply("You can't set their nickname...")
			return;
		}
		if(targetUserRolePosition >= botRolePostition) {
			await interaction.reply("I can't set their nickname...")
			return;
		}

		if (nick.length > 32) 
			return interaction.reply({content: `Nickname length cannot exceed 32 characters!` });
	
		member.setNickname(nick); 
		return interaction.reply({ content: `${member.user.username}'s nickname set! `});
	},
};