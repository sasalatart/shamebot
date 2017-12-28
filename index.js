const Botkit = require('botkit');
const snakeize = require('snakeize');
const { helpListener } = require('./src/listeners/help');
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

const { commands } = config;
controller.on('bot_message', failedBuildListener(controller));
controller.hears(commands.help, 'direct_mention', helpListener);
controller.hears(commands.showRanking, 'direct_mention', showRankingListener(controller));
controller.hears(commands.showReactions, 'direct_mention', showAllReactionsListener(controller));
controller.hears(commands.addReaction, 'direct_mention', addReactionListener(controller));
controller.hears(commands.deleteReaction, 'direct_mention', deleteReactionListener(controller));
