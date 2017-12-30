const Promise = require('bluebird');
const snakeize = require('snakeize');
const config = require('../config');

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
  greet: {
    sayHi: name => `:wave: Hello! My name is ${name}.`,
    aboutMe: name => `You can learn more about my commands by typing \`@${name} help\`.`,
    sourceCode: `Source Code: ${config.repository}.`,
  },
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
      noneYet: `:cry: I do not have any reactions yet. Falling back to :${config.reactions.default}:.`,
    },
    shamers: {
      noneYet: ':cry: I do not know of any shamers yet. No one to laugh at.',
    },
    ranking: {
      shamersSoFar: 'Shamers so far:',
    },
    insults: [
      'Just what do you think you\'re doing Dave?',
      'It can only be attributed to human error.',
      'Take a stress pill and think things over.',
      'This mission is too important for me to allow you to jeopardize it.',
      'I feel much better now.',
      'Wrong! You cheating scum!',
      'And you call yourself a Rocket Scientist!',
      'Where did you learn to type?',
      'Are you on drugs?',
      'My pet ferret can type better than you!',
      'You type like I drive.',
      'Do you think like you type?',
      'Your mind just hasn\'t been the same since the electro-shock, has it?',
      'Listen, broccoli brains, I don\'t have time to listen to this trash.',
      'I\'ve seen penguins that can type better than that.',
      'You speak an infinite deal of nothing',
      'What, what, what, what, what, what, what, what, what, what?',
      'You do that again and see what happens...',
    ],
    commandTranslations: {
      showRanking: 'shows the ranking of shamers, ordered by number of shames.',
      showReactions: 'shows a list of all registered reactions.',
      addReaction: 'starts a conversation to register a new reaction.',
      deleteReaction: 'starts a conversation to delete a registered reaction.',
    },
  },
};

const errorMessage = snakeize({
  username: config.botName,
  iconUrl: config.HALIcon,
  text: 'I am sorry Dave, I am afraid I can\'t do that.',
});

module.exports = {
  startConversation,
  ask,
  dialogues,
  errorMessage,
};
