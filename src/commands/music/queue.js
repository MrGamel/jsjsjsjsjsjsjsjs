// src/commands/music/queue.js
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('queue')
    .setDescription('Şu anda çalan ve sıradaki şarkıları listeler'),

  async execute(interaction) {
    // Örnek bir queue sistemi; kendi player'ına göre uyarlaman gerekebilir
    const queue = interaction.client.queue?.get(interaction.guild.id);

    if (!queue || !queue.songs.length) {
      return interaction.reply({ content: '📭 Kuyrukta şarkı yok.', ephemeral: true });
    }

    const embed = new EmbedBuilder()
      .setTitle('🎶 Şarkı Kuyruğu')
      .setDescription(
        queue.songs
          .map((s, i) => `${i === 0 ? '▶️ ' : `\`${i}\``} ${s.title}`)
          .join('\n')
      )
      .setColor(0x0099FF)
      .setFooter({ text: `Toplam: ${queue.songs.length} şarkı` });

    await interaction.reply({ embeds: [embed] });
  },
};