// src/index.js
import dotenv from 'dotenv';
dotenv.config();

import { Client, GatewayIntentBits, Collection } from 'discord.js';
import fs from 'fs';
import path from 'path';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

// Komutları yükle
const commandsPath = path.join(__dirname, 'commands');
fs.readdirSync(commandsPath).forEach(category => {
  const categoryPath = path.join(commandsPath, category);
  if (fs.lstatSync(categoryPath).isDirectory()) {
    fs.readdirSync(categoryPath)
      .filter(file => file.endsWith('.js'))
      .forEach(file => {
        const cmd = require(path.join(categoryPath, file));
        client.commands.set(cmd.data.name, cmd);
      });
  }
});

// Event’leri yükle
const eventsPath = path.join(__dirname, 'events');
fs.readdirSync(eventsPath)
  .filter(file => file.endsWith('.js'))
  .forEach(file => {
    const event = require(path.join(eventsPath, file));
    if (event.once) client.once(event.name, (...args) => event.execute(...args));
    else           client.on(event.name,  (...args) => event.execute(...args));
  });

// Botu başlat
client.login(process.env.DISCORD_TOKEN)
  .then(() => console.log('Bot giriş yaptı!'))
  .catch(console.error);