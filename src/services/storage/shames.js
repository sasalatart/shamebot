const _ = require('lodash');

const SHAMES = 'shames';

async function getShames(teamStorage) {
  let shames = {};
  try {
    shames = await teamStorage.get(SHAMES);
  } catch (error) {
    shames = { id: SHAMES };
    await teamStorage.save(shames);
  }
  return _.omit(shames, 'id');
}

async function addShameTo(authorName, teamStorage) {
  const shames = await getShames(teamStorage);
  return teamStorage.save({
    id: SHAMES,
    ...shames,
    [authorName]: (shames[authorName] || 0) + 1,
  });
}

module.exports = {
  getShames,
  addShameTo,
};
