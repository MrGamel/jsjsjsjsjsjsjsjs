// src/events/interactionCreate.js
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'interactionCreate',
  async execute(interaction) {
    // Slash komutlar
    if (interaction.isChatInputCommand()) {
      const cmd = interaction.client.commands.get(interaction.commandName);
      if (!cmd) return;
      try {
        await cmd.execute(interaction);
      } catch (err) {
        console.error(err);
        await interaction.reply({ content: 'Komut çalıştırılamadı.', ephemeral: true });
      }
    }

    // Buton etkileşimleri - /help komutu için
    if (interaction.isButton() && interaction.customId.startsWith('help_')) {
      const categories = {
        '🛠️ Yönetim': ['ban', 'kick', 'mute'],
        '🎵 Müzik': ['play', 'skip', 'queue'],
        '📊 Utility': ['ping', 'status', 'help'],
        '🎮 Eğlence': ['meme', 'trivia']
      };

      const idx = parseInt(interaction.customId.split('_')[1], 10);
      const catName = Object.keys(categories)[idx];
      const cmds = categories[catName].map(c => `\`${c}\``).join(' • ');

      const embed = new EmbedBuilder()
        .setTitle(`${catName} Komutları`)
        .setDescription(cmds)
        .setColor(0x00AE86);

      await interaction.update({ embeds: [embed], components: [] });
    }

    // Select menu ya da başka interaction türleri eklemek istersen buraya yazabilirim.
  },
};