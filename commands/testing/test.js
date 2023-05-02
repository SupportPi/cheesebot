const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('does something'),
	async execute(interaction) {
		await interaction.reply('sus');
	},
};