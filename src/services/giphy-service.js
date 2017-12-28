const request = require('request-promise');
const _ = require('lodash');
const config = require('../config');

const blacklistRegex = new RegExp(config.gifs.blacklistRegex, 'i');

function filterImageResolver(value, key) {
  return value.url && value.size < config.gifs.maxSize && !blacklistRegex.test(key);
}

function sortBySizeResolver(imageA, imageB) {
  return imageB.size - imageA.size;
}

function chooseFromResponse(response) {
  const candidateGifs = _.flatten(
    response.data.map(gif =>
      _.filter(gif.images, filterImageResolver)
        .sort(sortBySizeResolver)[0]),
  );

  return _.sample(candidateGifs).url;
}

async function searchGifFor(phrase) {
  const options = {
    uri: config.gifs.searchUrl,
    qs: { api_key: process.env.GIPHY_API_KEY, q: phrase },
    json: true,
  };

  const firstResponse = await request(options);
  const offset = _.random(0, firstResponse.pagination.total_count);
  const finalResponse = await request({ ...options, offset });
  return chooseFromResponse(finalResponse);
}

module.exports = {
  searchGifFor,
};
