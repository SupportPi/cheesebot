const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cheesetalk')
		.setDescription('cheeses a user')
		.addStringOption(target=>
			target
			.setName("message")
			.setDescription("message")
			.setRequired(true))
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction) {
		const member = interaction.options.getString('message');
		return interaction.reply({ content: member})
	},
};