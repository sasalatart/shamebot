const _ = require('lodash');
const camelize = require('camelize');
const snakeize = require('snakeize');
const { searchGifFor } = require('../services/giphy-service');
const { getTeamStorage } = require('../services/storage');
const { getRandomReaction } = require('../services/storage/reactions');
const { addShameTo } = require('../services/storage/shames');
const reactionsHelper = require('../utils/reactions');
const { dialogues } = require('../utils/conversations');

function robohashGenerator(authorName) {
  const date = (new Date()).getDate();
  return `https://robohash.org/${authorName}${date}.png`;
}

async function replyBuilder(authorName, authorIcon) {
  return {
    username: 'ShameBot',
    iconUrl: robohashGenerator(authorName),
    attachments: [{
      authorName,
      authorIcon,
      pretext: _.sample(dialogues.replies.insults),
      title: `Shame on you, ${authorName}!`,
      color: '#000',
      imageUrl: await searchGifFor('shame'),
    }],
  };
}

function failedBuildListener(controller) {
  return async (bot, message) => {
    if (!message.attachments || _.get(message.attachments, '[0].title') !== 'Build Failed') {
      return;
    }

    const teamStorage = getTeamStorage(controller);
    const { authorName, authorIcon } = camelize(message.attachments[0]);

    addShameTo(authorName, teamStorage);
    reactionsHelper(bot).add(message, await getRandomReaction(teamStorage));

    bot.reply(message, snakeize(await replyBuilder(authorName, authorIcon)));
  };
}

module.exports = {
  failedBuildListener,
};
