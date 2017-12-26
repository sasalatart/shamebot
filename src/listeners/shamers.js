const _ = require('lodash');
const snakeize = require('snakeize');
const { getTeamStorage } = require('../services/storage');
const { getShames } = require('../services/storage/shames');
const { dialogues: { replies } } = require('../utils/conversations');
const { robohash } = require('../utils/robohash');

function generateRanking(shames) {
  return Object.keys(shames)
    .sort((shamerA, shamerB) => shames[shamerB] - shames[shamerA])
    .map((shamerName, index) => {
      const shamesNumber = `${shames[shamerName]} shame${shames[shamerName] > 1 ? 's' : ''}`;
      return {
        title: `#${index + 1} ${shamerName} (${shamesNumber})`,
        short: false,
      };
    });
}

function showRankingListener(controller) {
  return async (bot, message) => {
    const shames = await getShames(getTeamStorage(controller));
    if (_.isEmpty(shames)) {
      bot.reply(message, replies.shamers.noneYet);
      return;
    }

    const reply = snakeize({
      username: 'ShameBot',
      iconUrl: robohash('Ranking'),
      attachments: [{
        pretext: 'Shamers so far:',
        color: '#000',
        fields: generateRanking(shames),
      }],
    });

    bot.reply(message, reply);
  };
}

module.exports = {
  showRankingListener,
};
