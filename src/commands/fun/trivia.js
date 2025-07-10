// src/commands/fun/trivia.js
const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const axios = require('axios');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('trivia')
    .setDescription('Rastgele bir bilgi yarışması sorusu gönderir'),

  async execute(interaction) {
    await interaction.deferReply();

    try {
      const res = await axios.get('https://opentdb.com/api.php?amount=1&type=multiple');
      const [q] = res.data.results;
      
      // Şıkları karıştır
      const choices = [...q.incorrect_answers];
      const correctIndex = Math.floor(Math.random() * (choices.length + 1));
      choices.splice(correctIndex, 0, q.correct_answer);

      // Embed hazırla
      const embed = new EmbedBuilder()
        .setTitle('🎲 Trivia Zamanı!')
        .setDescription(q.question)
        .addFields(
          choices.map((c, i) => ({ name: String.fromCharCode(65 + i), value: c, inline: true }))
        )
        .setColor(0x0099FF)
        .setFooter({ text: 'Doğru şıkkı seçmek için butona tıkla.' });

      // Butonları hazırla
      const row = new ActionRowBuilder()
        .addComponents(
          choices.map((_, i) =>
            new ButtonBuilder()
              .setCustomId(`trivia_${correctIndex}_${i}`)
              .setLabel(String.fromCharCode(65 + i))
              .setStyle(ButtonStyle.Secondary)
          )
        );

      await interaction.editReply({ embeds: [embed], components: [row] });
    } catch (err) {
      console.error(err);
      await interaction.editReply('Bir hata oluştu, tekrar deneyebilir misin? 😢');
    }
  },
};