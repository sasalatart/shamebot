const Promise = require('bluebird');
const { DEFAULT_REACTION } = require('../services/storage/reactions');

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

const dialogues = {
  questions: {
    reactions: {
      add: ':thinking_face: Which reaction would you like to add?',
      delete: ':thinking_face: Which reaction would you like to delete?',
    },
  },
  replies: {
    reactions: {
      learned: ':nerd_face: Reaction learned, look at your message.',
      knewIt: ':nerd_face: I already knew that reaction, look at your message.',
      deleted: ':wastebasket: Reaction deleted.',
      notFound: ':slightly_frowning_face: I did not know that reaction.',
      all: allReactions => `So far, I have learnt these reactions: ${allReactions}`,
      noneYet: `:cry: I do not have any reactions yet. Falling back to :${DEFAULT_REACTION}:.`,
    },
    error: 'I am sorry Dave, I am afraid I can\'t do that.',
  },
};

module.exports = {
  startConversation,
  ask,
  dialogues,
};
