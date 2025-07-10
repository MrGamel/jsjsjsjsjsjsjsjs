// src/commands/fun/echo.js
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('echo')
    .setDescription('Gönderdiğin yazıyı bot tekrarlar')
    .addStringOption(option =>
      option
        .setName('mesaj')
        .setDescription('Botun tekrarlamasını istediğin mesaj')
        .setRequired(true)
    ),

  async execute(interaction) {
    const text = interaction.options.getString('mesaj');
    await interaction.reply(text);
  },
};