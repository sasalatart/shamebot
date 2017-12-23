const Botkit = require('botkit');
const { failedBuildListener } = require('./src/listeners/builds');
const {
  addReactionListener,
  deleteReactionListener,
} = require('./src/listeners/reactions');

const controller = Botkit.slackbot({
  debug: process.env.NODE_ENV === 'production',
  json_file_store: './db',
});

controller.spawn({
  token: process.env.SLACK_TOKEN,
}).startRTM();

controller.on('bot_message', failedBuildListener(controller));
controller.hears('add reaction', 'direct_mention, mention', addReactionListener(controller));
controller.hears('delete reaction', 'direct_mention, mention', deleteReactionListener(controller));
