const Discord = require('discord.js')
const gotiny = require('gotiny')
require('dotenv').config()

const client = new Discord.Client()

const { urlCheck } = require('./helpers')

client.on('ready', () => {
  console.log(`Discord bot: Logged in as ${client.user.tag}!`)
})

// Listens for every message
client.on('message', (msg) => {
  // Check for valid links
  const url = urlCheck(msg.content)

  // Fires on every link longer than 24 characters
  if (!msg.author.bot && url && url[0].length > 24) {
    // Get GoTiny link and sends the response in the channel
    gotiny
      .set(url[0])
      .then((res) => client.channels.cache.get(msg.channel.id).send(res[0].tiny))
      .catch((err) => console.log(err))
  }
})

client.login(process.env.DISCORD_TOKEN)
