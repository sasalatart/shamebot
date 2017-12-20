const Botkit = require('botkit');
const { failedBuildListener } = require('./src/listeners/failed-build');

const controller = Botkit.slackbot({
  debug: process.env.NODE_ENV === 'production',
});

controller.spawn({
  token: process.env.SLACK_TOKEN,
}).startRTM();

controller.on('bot_message', failedBuildListener);
