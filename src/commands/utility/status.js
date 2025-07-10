// src/commands/utility/status.js
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('status')
    .setDescription('Botun çalışma durumu ve performans bilgilerini gösterir'),
    
  async execute(interaction) {
    const { client } = interaction;
    const uptimeSeconds = process.uptime();
    const hours = Math.floor(uptimeSeconds / 3600);
    const minutes = Math.floor((uptimeSeconds % 3600) / 60);
    const seconds = Math.floor(uptimeSeconds % 60);
    const memoryMB = (process.memoryUsage().rss / 1024 / 1024).toFixed(2);
    const ping = Math.round(client.ws.ping);

    const embed = new EmbedBuilder()
      .setTitle('🤖 Bot Durumu')
      .addFields(
        { name: 'Uptime', value: `${hours}h ${minutes}m ${seconds}s`, inline: true },
        { name: 'Bellek Kullanımı', value: `${memoryMB} MB`, inline: true },
        { name: 'Ping', value: `${ping} ms`, inline: true }
      )
      .setColor(0x00AE86)
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};