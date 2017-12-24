const _ = require('lodash');
const reactionsHelper = require('../utils/reactions');
const { startConversation, ask } = require('../utils/conversations');
const { getTeamStorage } = require('../services/storage');
const {
  getReactions,
  saveReaction,
  deleteReaction,
  DEFAULT_REACTION,
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
      bot.reply(message, `I do not have any reactions yet :cry:, and will fall back to :${DEFAULT_REACTION}:.`);
    } else {
      const formattedReactions = Object.keys(reactions).reduce((acc, reaction) => `${acc} :${reaction}:`, '');
      bot.reply(message, `So far, I have learnt these reactions: ${formattedReactions}`);
    }
  };
}

function addReactionListener(controller) {
  return async (bot, message) => {
    const teamStorage = getTeamStorage(controller);
    const conv = await startConversation(bot, message);
    const [, response] = await ask('Which reaction would you like to add?', conv);
    try {
      const parsedResponse = parse(response.text);
      await reactionsHelper(bot).add(response, parsedResponse);
      const { saved } = await saveReaction(parsedResponse, teamStorage);
      bot.reply(message, saved
        ? 'Reaction learned :nerd_face:, look at your message.'
        : 'I already knew that reaction :nerd_face:, look at your message.');
    } catch (error) {
      bot.reply(message, 'I am sorry Dave, I am afraid I can\'t do that.');
    }
  };
}

function deleteReactionListener(controller) {
  return async (bot, message) => {
    const teamStorage = getTeamStorage(controller);
    const conv = await startConversation(bot, message);
    const [, response] = await ask('Which reaction would you like to remove?', conv);
    try {
      const { deleted } = await deleteReaction(parse(response.text), teamStorage);
      bot.reply(message, deleted
        ? 'Reaction removed.'
        : 'I did not have that reaction.');
    } catch (error) {
      bot.reply(message, 'I am sorry Dave, I am afraid I can\'t do that.');
    }
  };
}

module.exports = {
  showAllReactionsListener,
  addReactionListener,
  deleteReactionListener,
};
