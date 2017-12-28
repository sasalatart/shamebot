const _ = require('lodash');
const config = require('../../config');

async function getReactions(teamStorage) {
  let reactions = {};
  try {
    reactions = await teamStorage.get(config.storage.ids.reactions);
  } catch (error) {
    reactions = { id: config.storage.ids.reactions, [config.reactions.default]: true };
    await teamStorage.save(reactions);
  }
  return _.omit(reactions, 'id');
}

async function getRandomReaction(teamStorage) {
  const reactions = await getReactions(teamStorage);
  return _.sample(Object.keys(reactions)) || config.reactions.default;
}

async function saveReaction(reaction, teamStorage) {
  const reactions = await getReactions(teamStorage);
  if (!reactions[reaction]) {
    await teamStorage.save({ id: config.storage.ids.reactions, ...reactions, [reaction]: true });
  }
  return { saved: !reactions[reaction] };
}

async function deleteReaction(reaction, teamStorage) {
  const reactions = await getReactions(teamStorage);
  if (reactions[reaction]) {
    await teamStorage.save({ id: config.storage.ids.reactions, ..._.omit(reactions, reaction) });
  }
  return { deleted: reactions[reaction] };
}

module.exports = {
  getReactions,
  getRandomReaction,
  saveReaction,
  deleteReaction,
};
