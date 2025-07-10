// src/events/interactionCreate.js
const { EmbedBuilder } = require('discord.js');

const helpCategories = {
  '🛠️ Yönetim': ['ban', 'kick', 'mute'],
  '🎵 Müzik': ['play', 'skip', 'queue'],
  '📊 Utility': ['ping', 'status', 'help'],
  '🎮 Eğlence': ['trivia']
};

module.exports = {
  name: 'interactionCreate',
  async execute(interaction) {
    // 1. Slash komutları (ChatInputCommand)
    if (interaction.isChatInputCommand()) {
      const cmd = interaction.client.commands.get(interaction.commandName);
      if (!cmd) return;
      try {
        await cmd.execute(interaction);
      } catch (err) {
        console.error(err);
        if (!interaction.replied) {
          await interaction.reply({ content: 'Komut çalıştırılamadı.', ephemeral: true });
        }
      }
      return; // komut işlendi, diğer bloklara geçme
    }

    // 2. Butonlar
    if (interaction.isButton()) {
      const id = interaction.customId;

      // 2.a. /help için kategori butonları
      if (id.startsWith('help_')) {
        const idx = parseInt(id.split('_')[1], 10);
        const categoryNames = Object.keys(helpCategories);
        const catName = categoryNames[idx];
        const cmds = helpCategories[catName].map(c => `\`${c}\``).join(' • ');

        const embed = new EmbedBuilder()
          .setTitle(`${catName} Komutları`)
          .setDescription(cmds)
          .setColor(0x00AE86);

        return interaction.update({ embeds: [embed], components: [] });
      }

      // 2.b. Trivia butonları (trivia_correctIndex_selectedIndex)
      if (id.startsWith('trivia_')) {
        const [, correct, selected] = id.split('_').map(Number);
        const isCorrect = correct === selected;

        const content = isCorrect
          ? '🎉 Doğru! Tebrikler!'
          : '❌ Maalesef yanlış cevap.';

        return interaction.update({ content, embeds: [], components: [] });
      }
    }

    // 3. İleride select menü veya başka interaction türleri ekleyebilirsin
    // if (interaction.isSelectMenu()) { ... }
  },
};