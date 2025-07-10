// src/events/guildMemberAdd.js
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'guildMemberAdd',
  async execute(member) {
    // Karşılama kanalının ID'sini .env dosyan veya Railway ortam değişkenlerinde WELCOME_CHANNEL_ID olarak tanımla
    const channelId = process.env.WELCOME_CHANNEL_ID;
    if (!channelId) return;

    const channel = member.guild.channels.cache.get(channelId);
    if (!channel) return;

    const embed = new EmbedBuilder()
      .setTitle('Sunucuya Hoşgeldin! 🎈')
      .setDescription(`Merhaba ${member}, aramıza katıldığın için teşekkürler!`)
      .setColor(0x00AE86)
      .setThumbnail(member.displayAvatarURL({ dynamic: true }))
      .setTimestamp();

    try {
      await channel.send({ embeds: [embed] });
    } catch (err) {
      console.error('Hoşgeldin mesajı gönderilemedi:', err);
    }
  },
};