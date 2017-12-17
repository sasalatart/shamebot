const Botkit = require('botkit');
const { searchGifFor } = require('./src/services/giphy-service');

const controller = Botkit.slackbot({
  debug: process.env.NODE_ENV === 'production',
});

controller.spawn({
  token: process.env.SLACK_TOKEN,
}).startRTM();

controller.hears('build failed', 'ambient', async (bot, message) => {
  const gifUrl = await searchGifFor('shame');
  bot.reply(message, gifUrl);
});
