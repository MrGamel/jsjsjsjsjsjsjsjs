// src/commands/utility/help.js
const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require('discord.js');

const categories = {
  '🛠️ Yönetim': ['ban', 'kick', 'mute'],
  '🎵 Müzik': ['play', 'skip', 'queue'],
  '📊 Utility': ['ping', 'status', 'help'],
  '🎮 Eğlence': ['meme', 'trivia']
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Komut kategorilerini gösterir.'),
    
  async execute(interaction) {
    // Embed oluştur
    const embed = new EmbedBuilder()
      .setTitle('Komut Kategorileri')
      .setDescription('Butonlara tıklayarak kategori seçebilirsiniz')
      .setColor(0x00AE86);

    // Butonları hazırla
    const row = new ActionRowBuilder()
      .addComponents(
        Object.keys(categories).map((cat, i) =>
          new ButtonBuilder()
            .setCustomId(`help_${i}`)
            .setLabel(cat)
            .setStyle(ButtonStyle.Primary)
        )
      );

    // İlk mesajı gönder
    await interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
  }
};