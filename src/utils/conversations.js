const Promise = require('bluebird');

function ask(question, conversation) {
  return Promise.fromCallback(cb =>
    conversation.ask(question, (res, newConv) => {
      newConv.next();
      cb(null, [newConv, res]);
    }));
}

function startConversation(bot, message) {
  return Promise.promisify(bot.startConversation)(message);
}

module.exports = {
  startConversation,
  ask,
};
