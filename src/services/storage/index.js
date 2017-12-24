const Promise = require('bluebird');

function getTeamStorage(controller) {
  return {
    save: Promise.promisify(controller.storage.teams.save),
    get: Promise.promisify(controller.storage.teams.get),
    delete: Promise.promisify(controller.storage.teams.delete),
    all: Promise.promisify(controller.storage.teams.all),
  };
}

module.exports = {
  getTeamStorage,
};
