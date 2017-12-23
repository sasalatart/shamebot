const Promise = require('bluebird');

module.exports = (bot) => {
  const add = Promise.promisify(bot.api.reactions.add);

  return {
    add: (message, reaction) => add({
      timestamp: message.ts,
      channel: message.channel,
      name: reaction,
    }),
  };
};
