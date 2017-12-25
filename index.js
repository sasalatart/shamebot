const Botkit = require('botkit');
const snakeize = require('snakeize');
const { failedBuildListener } = require('./src/listeners/builds');
const {
  showAllReactionsListener,
  addReactionListener,
  deleteReactionListener,
} = require('./src/listeners/reactions');

const controller = Botkit.slackbot(snakeize({
  debug: process.env.NODE_ENV === 'production',
  jsonFileStore: './db',
}));

controller.spawn({
  token: process.env.SLACK_TOKEN,
}).startRTM();

controller.on('bot_message', failedBuildListener(controller));
controller.hears('show reactions', 'direct_mention, mention', showAllReactionsListener(controller));
controller.hears('add reaction', 'direct_mention, mention', addReactionListener(controller));
controller.hears('delete reaction', 'direct_mention, mention', deleteReactionListener(controller));
