const Botkit = require('botkit');
const snakeize = require('snakeize');
const config = require('./src/config');
const {
  joinedListener,
  helpListener,
  failedBuildListener,
  showAllReactionsListener,
  addReactionListener,
  deleteReactionListener,
  showRankingListener,
} = require('./src/listeners');
const { scheduleCleanup } = require('./src/services/storage/shames');

const controller = Botkit.slackbot(snakeize({
  debug: config.debugEnabled,
  jsonFileStore: config.storage.dir,
  retry: config.reconnectAttempts,
}));

controller.spawn({
  token: process.env.SLACK_TOKEN,
}).startRTM();

scheduleCleanup(controller);

const { commands } = config;
controller.on('bot_channel_join', joinedListener);
controller.on('bot_message', failedBuildListener(controller));
controller.hears(commands.help, 'direct_mention', helpListener);
controller.hears(commands.showRanking, 'direct_mention', showRankingListener(controller));
controller.hears(commands.showReactions, 'direct_mention', showAllReactionsListener(controller));
controller.hears(commands.addReaction, 'direct_mention', addReactionListener(controller));
controller.hears(commands.deleteReaction, 'direct_mention', deleteReactionListener(controller));
