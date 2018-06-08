const request = require('request-promise');
const _ = require('lodash');
const camelize = require('camelize');
const config = require('../config');

function filterImageResolver(value, key) {
  return value.url
    && value.size < config.search.maxSize
    && !config.search.blackListedFormats.test(key);
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
    uri: config.search.url,
    qs: {
      api_key: process.env.GIPHY_API_KEY,
      q: phrase,
      rating: config.search.rating,
    },
    json: true,
  };

  const { totalCount, count } = camelize(await request(options)).pagination;
  options.qs.offset = _.random(0, totalCount / count);
  return chooseFromResponse(await request(options));
}

module.exports = {
  searchGifFor,
};
