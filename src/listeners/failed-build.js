const { searchGifFor } = require('../services/giphy-service');

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

async function failedBuildListener(bot, message) {
  if (!message.attachments) {
    return;
  }

  const { author_name: authorName, title } = message.attachments[0];

  if (title !== 'Build Failed') {
    return;
  }

  bot.api.reactions.add({
    timestamp: message.ts,
    channel: message.channel,
    name: 'astonished',
  });

  bot.reply(message, await replyBuilder(authorName));
}

module.exports = {
  failedBuildListener,
};
