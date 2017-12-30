const help = require('./help');
const builds = require('./builds');
const reactions = require('./reactions');
const shamers = require('./shamers');

module.exports = {
  ...help,
  ...builds,
  ...reactions,
  ...shamers,
};
