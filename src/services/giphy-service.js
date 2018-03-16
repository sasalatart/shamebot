const request = require('request-promise');
const _ = require('lodash');
const camelize = require('camelize');

const SEARCH_URL = 'https://api.giphy.com/v1/gifs/search';
const MAX_SIZE = 1750000;
const BLACKLIST_REGEX = new RegExp('(.*_(still|webp|mp4))', 'i');

function filterImageResolver(value, key) {
  return value.url && value.size < MAX_SIZE && !BLACKLIST_REGEX.test(key);
}

function sortBySizeResolver(imageA, imageB) {
  return imageB.size - imageA.size;
}

function chooseFromResponse(response) {
  return _
    .chain(response.data)
    .map(gif => _.filter(gif.images, filterImageResolver).sort(sortBySizeResolver)[0])
    .flatten()
    .sample()
    .value()
    .url;
}

async function searchGifFor(phrase) {
  const options = {
    uri: SEARCH_URL,
    qs: { api_key: process.env.GIPHY_API_KEY, q: phrase },
    json: true,
  };

  const { totalCount, count } = camelize(await request(options)).pagination;
  options.qs.offset = _.random(0, totalCount / count);
  return chooseFromResponse(await request(options));
}

module.exports = {
  searchGifFor,
};
