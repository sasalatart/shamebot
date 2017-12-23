const reactionsHelper = require('../utils/reactions');
const { startConversation, ask } = require('../utils/conversations');
const { getTeamStorage, saveReaction } = require('../services/storage-service');

function parse(reaction) {
  return reaction[0] === ':'
    ? reaction.substr(1).slice(0, -1)
    : reaction;
}

function addReactionListener(controller) {
  return async (bot, message) => {
    const teamStorage = getTeamStorage(controller);
    const conv = await startConversation(bot, message);

    conv.say('Roger that.');
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

module.exports = {
  addReactionListener,
};
