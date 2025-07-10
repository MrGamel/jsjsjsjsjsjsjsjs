// src/events/interactionCreate.js
module.exports = {
  name: 'interactionCreate',
  async execute(interaction) {
    // Slash komut mu?
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

    // Buton veya seçili menü işlemleri için buraya ekleyebilirsin
    if (interaction.isButton()) {
      // interaction.customId ile buton işleme
    }

    if (interaction.isSelectMenu()) {
      // interaction.customId ile seçim menüsü işleme
    }
  },
};