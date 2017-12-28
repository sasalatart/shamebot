const Botkit = require('botkit');
const snakeize = require('snakeize');
const { failedBuildListener } = require('./src/listeners/builds');
const {
  showAllReactionsListener,
  addReactionListener,
  deleteReactionListener,
} = require('./src/listeners/reactions');
const {
  showRankingListener,
} = require('./src/listeners/shamers');
const config = require('./src/config');

const controller = Botkit.slackbot(snakeize({
  debug: config.debugEnabled,
  jsonFileStore: config.storage.dir,
  retry: config.reconnectAttempts,
}));

controller.spawn({
  token: process.env.SLACK_TOKEN,
}).startRTM();

controller.on('bot_message', failedBuildListener(controller));
controller.hears('show reactions', 'direct_mention, mention', showAllReactionsListener(controller));
controller.hears('add reaction', 'direct_mention, mention', addReactionListener(controller));
controller.hears('delete reaction', 'direct_mention, mention', deleteReactionListener(controller));
controller.hears('show ranking', 'direct_mention, mention', showRankingListener(controller));
