// src/commands/utility/ping.js
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Botun gecikmesini ölçer ve yanıt verir'),
  
  async execute(interaction) {
    // İlk önce “Pinging...” mesajı gönderip yanıtını bekleyelim
    const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
    
    // Mesaj zaman damgalarından gecikmeyi hesaplayıp düzenleyelim
    const latency = sent.createdTimestamp - interaction.createdTimestamp;
    await interaction.editReply(`🏓 Pong! Gecikme: ${latency}ms`);
  },
};