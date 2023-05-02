const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('uncheese')
		.setDescription('uncheeses a user')
		.addUserOption(target=>
			target
			.setName("target")
			.setDescription("user to move to limbo")
			.setRequired(true))
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction) {
		const member = interaction.options.getMember('target');
		const { nickname } = interaction.guild.members.cache.find(E => E.id === member.id);
		

		const targetUserRolePosition = member.roles.highest.position;
		const requestUserRolePosition = interaction.member.roles.highest.position;
		const botRolePostition = interaction.guild.members.me.roles.highest.position;

		console.log(targetUserRolePosition, requestUserRolePosition, botRolePostition)
		if(targetUserRolePosition >= requestUserRolePosition) {
			await interaction.reply("You can't uncheese them...")
			return;
		}
		if(targetUserRolePosition >= botRolePostition) {
			await interaction.reply("I can't uncheese them...")
			return;
		}
		console.log("\n\n" + nickname + "\n\n");
		const name = member.user.username;
		var role= member.guild.roles.cache.find(role => role.name === "Inactive"); 
		//member.roles.add(role);
		let basename = member.user.username;
		if(nickname)
			basename = nickname.replace("[Cheese]", "");
		member.setNickname(basename);
		return interaction.reply({ content: `Uncheesed ${name}. `})
	},
};