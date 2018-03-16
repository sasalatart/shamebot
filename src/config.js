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
  searchTerms: [
    'shame',
    'stupid',
    'laughing',
  ],
  HALIcon: 'https://goo.gl/LsPgJe',
  giphyAttributionMark: 'https://goo.gl/AcrduK',
  repository: 'https://github.com/sasalatart/shamebot',
};
