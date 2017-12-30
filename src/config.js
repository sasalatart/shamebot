module.exports = {
  botName: 'ShameBot',
  reconnectAttempts: 10,
  storage: {
    dir: './storage',
    ids: {
      reactions: 'reactions',
      shames: 'shames',
    },
  },
  gifs: {
    searchUrl: 'https://api.giphy.com/v1/gifs/search',
    maxSize: 1000000,
    blacklistRegex: '(.*_(still|webp|mp4))',
  },
  attachments: {
    color: '#000',
  },
  reactions: {
    default: 'astonished',
  },
  HALIcon: 'https://goo.gl/LsPgJe',
  debugEnabled: process.env.NODE_ENV !== 'production',
  commands: {
    help: 'help',
    showRanking: 'show ranking',
    showReactions: 'show reactions',
    addReaction: 'add reaction',
    deleteReaction: 'delete reaction',
  },
};
