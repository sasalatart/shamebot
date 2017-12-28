const _ = require('lodash');
const config = require('../../config');

async function getShames(teamStorage) {
  let shames = {};
  try {
    shames = await teamStorage.get(config.storage.ids.shames);
  } catch (error) {
    shames = { id: config.storage.ids.shames };
    await teamStorage.save(shames);
  }
  return _.omit(shames, 'id');
}

async function addShameTo(authorName, teamStorage) {
  const shames = await getShames(teamStorage);
  return teamStorage.save({
    id: config.storage.ids.shames,
    ...shames,
    [authorName]: (shames[authorName] || 0) + 1,
  });
}

module.exports = {
  getShames,
  addShameTo,
};
