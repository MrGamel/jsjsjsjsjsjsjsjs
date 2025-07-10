// src/commands/moderation/ban.js
const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Sunucudan bir kullanıcıyı yasaklar')
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addUserOption(option =>
      option
        .setName('kullanıcı')
        .setDescription('Yasaklanacak kullanıcı')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('sebep')
        .setDescription('Ban sebebi')
        .setRequired(false)
    ),

  async execute(interaction) {
    const member = interaction.options.getUser('kullanıcı');
    const reason = interaction.options.getString('sebep') || 'Belirtilmedi';

    // Yetki kontrolü
    if (!interaction.member.permissions.has(PermissionFlagsBits.BanMembers)) {
      return interaction.reply({ content: 'Bu komutu kullanmak için yeterli yetkin yok.', ephemeral: true });
    }

    // Hedefi banla
    try {
      const guildMember = await interaction.guild.members.fetch(member.id);
      await guildMember.ban({ reason });

      const embed = new EmbedBuilder()
        .setTitle('Üye Banlandı')
        .addFields(
          { name: 'Kullanıcı', value: `${member.tag} (${member.id})` },
          { name: 'Yetkili', value: `${interaction.user.tag}` },
          { name: 'Sebep', value: reason }
        )
        .setColor(0xE74C3C)
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'Üye banlanamadı. Belki yeterli yetkim yoktur?', ephemeral: true });
    }
  },
};