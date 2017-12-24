const _ = require('lodash');
const { searchGifFor } = require('../services/giphy-service');
const { getTeamStorage } = require('../services/storage');
const { getRandomReaction } = require('../services/storage/reactions');
const reactionsHelper = require('../utils/reactions');

function robohashGenerator(authorName) {
  const date = (new Date()).getDate();
  return `https://robohash.org/${authorName}${date}.png`;
}

async function replyBuilder(authorName) {
  return {
    username: 'ShameBot',
    icon_url: robohashGenerator(authorName),
    attachments: [{
      title: `Shame on you, ${authorName}!`,
      color: '#000',
      image_url: await searchGifFor('shame'),
    }],
  };
}

function failedBuildListener(controller) {
  return async (bot, message) => {
    if (!message.attachments || _.get(message.attachments, '[0].title') !== 'Build Failed') {
      return;
    }

    const { author_name: authorName } = message.attachments[0];
    const reaction = await getRandomReaction(getTeamStorage(controller));
    reactionsHelper(bot).add(message, reaction);
    bot.reply(message, await replyBuilder(authorName));
  };
}

module.exports = {
  failedBuildListener,
};
