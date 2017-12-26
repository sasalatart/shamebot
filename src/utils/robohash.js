function robohash(text) {
  return `https://robohash.org/${text}.png`;
}

function dailyRobohash(text) {
  const date = (new Date()).getDate();
  return robohash(`${text}${date}`);
}

module.exports = {
  robohash,
  dailyRobohash,
};
