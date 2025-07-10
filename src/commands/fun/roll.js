// src/commands/fun/roll.js
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('roll')
    .setDescription('1 ile verdiğin sayı arasında rastgele bir sayı atar')
    .addIntegerOption(option =>
      option
        .setName('max')
        .setDescription('Atılacak sayının üst sınırı')
        .setRequired(true)
    ),

  async execute(interaction) {
    const max = interaction.options.getInteger('max');
    if (max < 1) {
      return interaction.reply({
        content: 'Lütfen 1 veya daha büyük bir sayı gir.',
        ephemeral: true
      });
    }

    const result = Math.floor(Math.random() * max) + 1;
    await interaction.reply(`🎲 Sonuç: **${result}** (1–${max})`);
  },
};