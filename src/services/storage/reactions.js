const _ = require('lodash');

const REACTIONS = 'reactions';
const DEFAULT_REACTION = 'astonished';

async function getReactions(teamStorage) {
  let reactions = {};
  try {
    reactions = await teamStorage.get(REACTIONS);
  } catch (error) {
    reactions = { id: REACTIONS, [DEFAULT_REACTION]: true };
    await teamStorage.save(reactions);
  }
  return _.omit(reactions, 'id');
}

async function getRandomReaction(teamStorage) {
  const reactions = await getReactions(teamStorage);
  return _.sample(Object.keys(reactions)) || DEFAULT_REACTION;
}

async function saveReaction(reaction, teamStorage) {
  const reactions = await getReactions(teamStorage);
  if (!reactions[reaction]) {
    await teamStorage.save({ id: REACTIONS, ...reactions, [reaction]: true });
  }
  return { saved: !reactions[reaction] };
}

async function deleteReaction(reaction, teamStorage) {
  const reactions = await getReactions(teamStorage);
  if (reactions[reaction]) {
    await teamStorage.save({ id: REACTIONS, ..._.omit(reactions, reaction) });
  }
  return { deleted: reactions[reaction] };
}

module.exports = {
  getReactions,
  getRandomReaction,
  saveReaction,
  deleteReaction,
  DEFAULT_REACTION,
};
