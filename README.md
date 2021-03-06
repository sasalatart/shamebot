# ShameBot

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Code Climate](https://codeclimate.com/github/sasalatart/shamebot/badges/gpa.svg)](https://codeclimate.com/github/sasalatart/shamebot)
[![Docker Automated build](https://img.shields.io/docker/automated/jrottenberg/ffmpeg.svg)](sasalatart/shamebot)
[![](https://images.microbadger.com/badges/version/sasalatart/shamebot.svg)](https://microbadger.com/images/sasalatart/shamebot)
[![](https://images.microbadger.com/badges/image/sasalatart/shamebot.svg)](https://microbadger.com/images/sasalatart/shamebot)

## About

Bot built with [Botkit](https://botkit.ai/) that embarrasses -in a friendly way- slack teammates who commit programming mistakes according to failed builds emitted by the CI bot.

## Demo

![demo-commands](https://goo.gl/RPpSTE)

## Setup

#### API Keys

You will need a `SLACK_TOKEN` which identifies your bot with your slack team, and a `GIPHY_API_KEY`, which will enable ShameBot to send GIFs:

- You can get your `SLACK_TOKEN` by creating a user bot for your team [here](https://api.slack.com/bot-users).
- You can get your `GIPHY_API_KEY` [here](https://developers.giphy.com/).

#### Development

1. Make sure to have a Slack Team, with ShameBot as a member.
2. Clone and cd into this repository
3. run `npm install` (or `yarn install`)
4. Export the environment variables `SLACK_TOKEN` and `GIPHY_API_KEY`.
5. run `nodemon .`

#### Docker

```sh
docker run -d --name=shamebot \
  --env SLACK_TOKEN=<your-slack-token> \
  --env GIPHY_API_KEY=<your-giphy-api-key> \
  sasalatart/shamebot
```

## Contributing

1. Fork this repository
2. Create your branch from the `develop` branch (`git checkout -b my-changes`)
3. Commit your changes using [these emojis](https://github.com/dannyfritz/commit-message-emoji) (`git commit -am '<emoji> my changes message'`)
4. Push your branch (`git push origin my-changes`)
5. Create a new Pull Request

---

![giphy-attribution](https://goo.gl/AcrduK)
