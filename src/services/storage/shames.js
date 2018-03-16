const _ = require('lodash');
const { CronJob } = require('cron');
const { getTeamStorage } = require('../../services/storage');
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

/* eslint-disable no-console */
function scheduleCleanup(controller) {
  const { cronTime, timeZone } = config.rankingCleanup;
  console.log(`Scheduling cleanup at ${cronTime}`);
  const job = new CronJob({
    cronTime,
    onTick: () => getTeamStorage(controller)
      .delete('shames')
      .then(() => console.log(`Reset shames at ${new Date()}`))
      .catch(() => console.log(`There were no shames to reset at ${new Date()}`)),
    start: false,
    timeZone,
  });
  job.start();
}
/* eslint-enable no-console */

module.exports = {
  getShames,
  addShameTo,
  scheduleCleanup,
};
