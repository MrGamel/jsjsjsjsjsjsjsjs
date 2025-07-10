// src/commands/music/skip.js
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('skip')
    .setDescription('Çalan şarkıyı geçer ve sıradakini oynatır'),

  async execute(interaction) {
    // Gerçek müzik bot altyapısına göre skip mantığı ekle
    // Örnek: queue.skip()

    // Şimdilik sadece geri bildirim
    await interaction.reply({
      content: '⏭️ Şarkı geçildi! Sıradaki oynatılacak.',
      ephemeral: true
    });
  },
};