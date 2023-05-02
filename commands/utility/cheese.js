const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cheese')
		.setDescription('cheeses a user')
		.addUserOption(target=>
			target
			.setName("target")
			.setDescription("cheese target")
			.setRequired(true))
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction) {
		const member = interaction.options.getMember('target');
		const { nickname } = interaction.guild.members.cache.find(E => E.id === member.id);
		

		const targetUserRolePosition = member.roles.highest.position;
		const requestUserRolePosition = interaction.member.roles.highest.position;
		const botRolePostition = interaction.guild.members.me.roles.highest.position;

		if(targetUserRolePosition >= requestUserRolePosition) {
			await interaction.reply("You can't cheese them...")
			return;
		}
		if(targetUserRolePosition >= botRolePostition) {
			await interaction.reply("I can't cheese them...")
			return;
		}
		console.log("\n\n" + nickname + "\n\n");
		//var role= member.guild.roles.cache.find(role => role.name === "Inactive"); 
		//member.roles.add(role);
		let basename = member.user.username;
		if(nickname)
			basename = nickname.replace("[Cheese]", "");
		member.setNickname("[Cheese] " + basename );
		return interaction.reply({ content: `Nice to cheese you ${basename}! `})
	},
};