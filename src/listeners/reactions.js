const _ = require('lodash');
const reactionsHelper = require('../utils/reactions');
const {
  startConversation,
  ask,
  dialogues: { questions, replies },
  errorMessage,
} = require('../utils/conversations');
const { getTeamStorage } = require('../services/storage');
const {
  getReactions,
  saveReaction,
  deleteReaction,
} = require('../services/storage/reactions');

function parse(reaction) {
  return reaction[0] === ':'
    ? reaction.substr(1).slice(0, -1)
    : reaction;
}

function showAllReactionsListener(controller) {
  return async (bot, message) => {
    const reactions = await getReactions(getTeamStorage(controller));

    if (_.isEmpty(reactions)) {
      bot.reply(message, replies.reactions.noneYet);
      return;
    }

    const allReactions = Object.keys(reactions).reduce((acc, reaction) => `${acc} :${reaction}:`, '');
    bot.reply(message, replies.reactions.all(allReactions));
  };
}

function addReactionListener(controller) {
  return async (bot, message) => {
    const teamStorage = getTeamStorage(controller);
    const conv = await startConversation(bot, message);
    const [, response] = await ask(questions.reactions.add, conv);
    try {
      const parsedResponse = parse(response.text);
      await reactionsHelper(bot).add(response, parsedResponse);
      const { saved } = await saveReaction(parsedResponse, teamStorage);
      bot.reply(message, saved ? replies.reactions.learned : replies.reactions.knewIt);
    } catch (error) {
      bot.reply(message, errorMessage);
    }
  };
}

function deleteReactionListener(controller) {
  return async (bot, message) => {
    const teamStorage = getTeamStorage(controller);
    const conv = await startConversation(bot, message);
    const [, response] = await ask(questions.reactions.delete, conv);
    try {
      const { deleted } = await deleteReaction(parse(response.text), teamStorage);
      bot.reply(message, deleted ? replies.reactions.deleted : replies.reactions.notFound);
    } catch (error) {
      bot.reply(message, errorMessage);
    }
  };
}

module.exports = {
  showAllReactionsListener,
  addReactionListener,
  deleteReactionListener,
};
