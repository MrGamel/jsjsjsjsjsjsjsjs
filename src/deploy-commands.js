// src/deploy-commands.js
const fs = require('fs');
const path = require('path');
const { REST, Routes } = require('discord.js');
require('dotenv').config();

const commands = [];
const commandsPath = path.join(__dirname, 'commands');

fs.readdirSync(commandsPath).forEach(category => {
  const categoryPath = path.join(commandsPath, category);
  if (fs.lstatSync(categoryPath).isDirectory()) {
    fs.readdirSync(categoryPath)
      .filter(file => file.endsWith('.js'))
      .forEach(file => {
        const command = require(path.join(categoryPath, file));
        commands.push(command.data.toJSON());
      });
  }
});

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log('Slash komutlar deploy ediliyor...');
    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    );
    console.log('Slash komutlar başarıyla deploy edildi.');
  } catch (error) {
    console.error(error);
  }
})();