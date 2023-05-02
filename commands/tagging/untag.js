const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('untag')
		.setDescription('untags a user')
        .addUserOption(target=>
			target
			.setName("target")
			.setDescription("target to untag")
			.setRequired(true))
        .addStringOption(tag=>
            tag
            .setName('tag')
            .setDescription('tag to untag')
            .setRequired(true))
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),



	async execute(interaction) {
		const tag_opt = interaction.options.getString('tag')
		const member = interaction.options.getMember('target');
		const { nickname } = interaction.guild.members.cache.find(E => E.id === member.id);
		let tag = tag_opt.charAt(0).toUpperCase() + tag_opt.slice(1);
		tag = tag.replace('@', '@​\u200b');

		const targetUserRolePosition = member.roles.highest.position;
		const requestUserRolePosition = interaction.member.roles.highest.position;
		const botRolePostition = interaction.guild.members.me.roles.highest.position;

		if(targetUserRolePosition >= requestUserRolePosition) {
			await interaction.reply("You can't untag them...")
			return;
		}
		if(targetUserRolePosition >= botRolePostition) {
			await interaction.reply("I can't untag them...")
			return;
		}

		//var role= member.guild.roles.cache.find(role => role.name === "Inactive"); 
		//member.roles.add(role);
		let basename = member.user.username;
		if(nickname) basename = nickname;
		let newname = basename.replace(`[${tag}]`, "");
		member.setNickname(newname); 
		return interaction.reply({ content: `${member.user.username} untagged! `})
	},
};