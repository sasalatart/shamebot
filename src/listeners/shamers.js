const _ = require('lodash');
const snakeize = require('snakeize');
const { getTeamStorage } = require('../services/storage');
const { getShames } = require('../services/storage/shames');
const { dialogues: { replies } } = require('../utils/conversations');
const { robohash } = require('../utils/robohash');
const config = require('../config');

function generateRankingFields(rawShames) {
  const shamersByShames = _.groupBy(Object.keys(rawShames), userName => rawShames[userName]);

  return Object.keys(shamersByShames)
    .sort((shamesA, shamesB) => shamesB - shamesA)
    .map((shames, index) => {
      const shamesNumber = `${shames} shame${shames > 1 ? 's' : ''}`;
      const shamers = shamersByShames[shames].join(', ');
      return {
        title: `#${index + 1} ${shamers} (${shamesNumber})`,
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
      username: config.botName,
      iconUrl: robohash('ranking'),
      attachments: [{
        pretext: replies.ranking.shamersSoFar,
        color: config.attachments.color,
        fields: generateRankingFields(shames),
      }],
    });

    bot.reply(message, reply);
  };
}

module.exports = {
  showRankingListener,
};
