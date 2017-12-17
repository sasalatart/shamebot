const Botkit = require('botkit');

const controller = Botkit.slackbot({
  debug: process.env.NODE_ENV === 'production',
});

controller.spawn({
  token: process.env.SLACK_TOKEN,
}).startRTM();

controller.hears('hello', ['direct_message', 'direct_mention', 'mention'], (bot, message) => {
  bot.reply(message, 'hello :)');
});
