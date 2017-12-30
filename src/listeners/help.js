const _ = require('lodash');
const snakeize = require('snakeize');
const { dialogues: { greet, replies: { commandTranslations } } } = require('../utils/conversations');
const config = require('../config');

function renderCommands(botName) {
  return Object.keys(_.omit(config.commands, 'help'))
    .map(command => ({
      title: `@${botName} ${config.commands[command]}`,
      value: commandTranslations[command],
      short: false,
    }));
}

function joinedListener(bot, message) {
  const { id, name } = bot.identity;

  if (id !== message.user) {
    return;
  }

  const reply = snakeize({
    iconEmoji: ':robot_face:',
    username: config.botName,
    attachments: [{
      pretext: greet.sayHi(name),
      color: config.attachments.color,
      fields: [{
        value: greet.aboutMe(name),
        short: false,
      }, {
        value: greet.sourceCode,
        short: false,
      }],
      imageUrl: config.giphyAttributionMark,
    }],
  });

  bot.reply(message, reply);
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
  joinedListener,
  helpListener,
};
