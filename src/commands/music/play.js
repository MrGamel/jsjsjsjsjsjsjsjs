// src/commands/music/play.js
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Bir şarkıyı çalmaya başlar')
    .addStringOption(option =>
      option
        .setName('şarkı')
        .setDescription('YouTube veya Spotify bağlantısı')
        .setRequired(true)
    ),

  async execute(interaction) {
    const track = interaction.options.getString('şarkı');

    // Bu noktada müzik sistemiyle entegrasyon yapılmalı (örnek log)
    await interaction.reply(`🎵 Şarkı kuyruğa eklendi: **${track}**\n(Not: Gerçek oynatma ileride entegre edilecek.)`);
  },
};