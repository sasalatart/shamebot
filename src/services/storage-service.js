const Promise = require('bluebird');
const _ = require('lodash');

const REACTIONS = 'reactions';

function getTeamStorage(controller) {
  return {
    save: Promise.promisify(controller.storage.teams.save),
    get: Promise.promisify(controller.storage.teams.get),
    delete: Promise.promisify(controller.storage.teams.delete),
    all: Promise.promisify(controller.storage.teams.all),
  };
}

async function getReactions(teamStorage) {
  let reactions = {};
  try {
    reactions = await teamStorage.get(REACTIONS);
  } catch (error) {
    reactions = { id: REACTIONS, astonished: true };
    await teamStorage.save(reactions);
  }
  return _.omit(reactions, 'id');
}

async function getRandomReaction(teamStorage) {
  const reactions = await getReactions(teamStorage);
  return _.sample(Object.keys(reactions));
}

async function saveReaction(reaction, teamStorage) {
  const reactions = await getReactions(teamStorage);
  if (!reactions[reaction]) {
    await teamStorage.save({ id: REACTIONS, ...reactions, [reaction]: true });
  }
  return { saved: !reactions[reaction] };
}

module.exports = {
  getTeamStorage,
  getReactions,
  getRandomReaction,
  saveReaction,
};
