module.exports = {
  botName: 'ShameBot',
  reconnectAttempts: 10,
  debugEnabled: process.env.NODE_ENV !== 'production',
  storage: {
    dir: './storage',
    ids: {
      reactions: 'reactions',
      shames: 'shames',
    },
  },
  rankingCleanup: {
    cronTime: '0 0 5 * * *',
    timeZone: 'America/Santiago',
  },
  attachments: {
    color: '#000',
  },
  reactions: {
    default: 'astonished',
  },
  commands: {
    help: 'help',
    showRanking: 'show ranking',
    showReactions: 'show reactions',
    addReaction: 'add reaction',
    deleteReaction: 'delete reaction',
  },
  search: {
    url: 'https://api.giphy.com/v1/gifs/search',
    terms: [
      'again',
      'boring',
      'busted',
      'laughing',
      'oops',
      'screaming',
      'shame',
      'stupid',
      'haha',
      'lol',
      'dumb',
      'nope',
    ],
    rating: 'pg-13',
    maxSize: 1750000,
    blackListedFormats: new RegExp('(.*_(still|webp|mp4))', 'i'),
  },
  HALIcon: 'https://goo.gl/LsPgJe',
  giphyAttributionMark: 'https://goo.gl/AcrduK',
  repository: 'https://github.com/sasalatart/shamebot',
};
