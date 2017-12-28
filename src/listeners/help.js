const _ = require('lodash');
const snakeize = require('snakeize');
const { dialogues: { replies: { commandTranslations } } } = require('../utils/conversations');
const config = require('../config');

function renderCommands(botName) {
  return Object.keys(_.omit(config.commands, 'help'))
    .map(command => ({
      title: `@${botName} ${config.commands[command]}`,
      value: commandTranslations[command],
      short: false,
    }));
}

function helpListener(bot, message) {
  const reply = snakeize({
    iconEmoji: ':robot_face:',
    username: config.botName,
    attachments: [{
      fields: renderCommands(bot.identity.name),
      color: config.attachments.color,
    }],
  });

  bot.reply(message, reply);
}

module.exports = {
  helpListener,
};
