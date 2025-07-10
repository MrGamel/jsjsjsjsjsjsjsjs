// src/commands/moderation/kick.js
const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder
} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Sunucudan bir kullanıcıyı atar')
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
    .addUserOption(option =>
      option
        .setName('kullanıcı')
        .setDescription('Atılacak kullanıcıyı seç')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('sebep')
        .setDescription('Atılma sebebi')
        .setRequired(false)
    ),

  async execute(interaction) {
    const user = interaction.options.getUser('kullanıcı');
    const reason = interaction.options.getString('sebep') || 'Belirtilmedi';

    if (!interaction.member.permissions.has(PermissionFlagsBits.KickMembers)) {
      return interaction.reply({
        content: 'Bu komutu kullanmak için yeterli yetkin yok.',
        ephemeral: true
      });
    }

    try {
      const member = await interaction.guild.members.fetch(user.id);
      await member.kick(reason);

      const embed = new EmbedBuilder()
        .setTitle('Üye Atıldı')
        .addFields(
          { name: 'Kullanıcı', value: `${user.tag} (${user.id})` },
          { name: 'Yetkili', value: interaction.user.tag },
          { name: 'Sebep', value: reason }
        )
        .setColor(0xF39C12)
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    } catch (err) {
      console.error(err);
      await interaction.reply({
        content: 'Üye atılamadı. Belki yeterli yetkim yoktur?',
        ephemeral: true
      });
    }
  }
};