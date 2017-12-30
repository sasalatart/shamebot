const request = require('request-promise');
const _ = require('lodash');

const SEARCH_URL = 'https://api.giphy.com/v1/gifs/search';
const MAX_SIZE = 1000000;
const BLACKLIST_REGEX = new RegExp('(.*_(still|webp|mp4))', 'i');

function filterImageResolver(value, key) {
  return value.url && value.size < MAX_SIZE && !BLACKLIST_REGEX.test(key);
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
    uri: SEARCH_URL,
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
