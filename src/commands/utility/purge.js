// src/commands/utility/purge.js
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('purge')
    .setDescription('Belirtilen sayıda mesajı siler')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addIntegerOption(option =>
      option
        .setName('adet')
        .setDescription('Silinecek mesaj sayısı (2–100)')
        .setRequired(true)
    ),

  async execute(interaction) {
    const amount = interaction.options.getInteger('adet');

    if (amount < 2 || amount > 100) {
      return interaction.reply({
        content: 'Lütfen 2 ile 100 arasında bir sayı gir.',
        ephemeral: true
      });
    }

    try {
      // Mesajları toplu sil
      const deleted = await interaction.channel.bulkDelete(amount, true);
      await interaction.reply({
        content: `🧹 ${deleted.size} mesaj silindi.`,
        ephemeral: true
      });
    } catch (err) {
      console.error(err);
      await interaction.reply({
        content: 'Mesajlar silinirken bir hata oluştu.',
        ephemeral: true
      });
    }
  },
};