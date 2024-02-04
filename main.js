const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.MessageContent, 
    GatewayIntentBits.DirectMessages, 
    GatewayIntentBits.GuildVoiceStates
  ] 
  });

const { token } = require('./config.json');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('database.db');



require('./source/commands/nroll.js').nrollFunction(client);
require('./source/commands/uroll.js').uroll(client);
require('./source/commands/coinflip.js').coinflipFun(client);
require('./source/commands/info.js').info(client, db);
require('./source/commands/shop/shop.js').shopFun(client, db).muteAndKickButton(client, db);
require('./source/commands/shop/kick.js').kickFun(client, db);
require('./source/commands/shop/mute.js').muteFun(client, db);
require('./source/commands/shop/muteVoice.js').muteVoice(client, db);
require('./source/commands/help.js').help(client);
require('./source/commands/casino.js').casinoSlots(client, db);
require('./source/commands/vsend.js').vsend(client, db);

client.once('ready', () => {
  console.log('Bot is reasdy!');

  db.run(
    `CREATE TABLE IF NOT EXISTS users (
     id TEXT PRIMARY KEY,
     total_time INTEGER DEFAULT 0
     )`);

  db.run(
    `CREATE TABLE IF NOT EXISTS message (
     id TEXT PRIMARY KEY,
     message_count INTEGER DEFAULT 0,
     lvl_start INTEGER DEFAULT 20,
     lvl INTEGER DEFAULT 0
    )`);

  db.run(
    `CREATE TABLE IF NOT EXISTS currency (
     id TEXT PRIMARY KEY,
     virt INTEGER DEFAULT 0
    )`);
});
 
client.setMaxListeners(0);


client.on('voiceStateUpdate', (oldState, newState) => {
  const userId = newState.member.id;
  const inVoiceChannel = newState.channel !== null;
  const notVoiceChannel = oldState.channel !== null;
  if (inVoiceChannel && !notVoiceChannel) {
    startTime = Date.now;
    db.run(`INSERT OR IGNORE INTO users (id) VALUES (?)`, [userId]);
    db.run(`INSERT OR IGNORE INTO currency (id) VALUES (?)`, [userId]);
    
    interval = setInterval(() => {
      db.run('UPDATE users SET total_time = total_time + 1 WHERE id = ?', [userId]);
      db.get(`SELECT total_time FROM users WHERE id = ?`, [userId], (err, row) => {
        totalTime = row.total_time;
        if (totalTime % 60 === 0) {
          db.run(`UPDATE currency SET virt = virt + 1 WHERE id = ?`, [userId]);
        }
      });
    }, 1000); 

    newState.member.voice.interval = interval;
  } else if (!inVoiceChannel && notVoiceChannel) {
    if (oldState.member.voice.interval) {
      clearInterval(oldState.member.voice.interval);
      delete oldState.member.voice.interval;
    }
  }
});


client.on('messageCreate', message => {
  if (!message.author.bot) {
    const userId = message.author.id;
    db.run(`INSERT OR IGNORE INTO message (id) VALUES (?)`, [userId]);
    
    db.run(`UPDATE message SET message_count = message_count + 1 WHERE id = ?`, [userId]);

    db.get(`SELECT message_count FROM message WHERE id = ?`, [userId], (err, row) => {
      const currentExp = row.message_count; 
      db.get(`SELECT lvl_start FROM message WHERE id = ?`, [userId], (err, row) => {
        const lvlStart = row.lvl_start;
        if (currentExp === Math.round(lvlStart)) { 
          db.run(`UPDATE message SET lvl = lvl + 1 WHERE id = ?`, [userId]);
          db.run(`UPDATE message SET lvl_start = ROUND(lvl_start * 1.5) WHERE id = ?`, [userId]);
          db.get(`SELECT lvl FROM message WHERE id = ?`, [userId], (err, row) => {
            currentLvl = row.lvl
            message.reply(`${currentLvl} уровень`);
          });
        }
      }); 
    });
  }
});

client.login(token)