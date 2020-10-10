# Webhooker

Webhooker is implemented for [LINE webhook API](https://developers.line.biz/en/news/2020/10/06/messaging-api-update-october-2020/).

> Group/Room/User id is saved in memory currently, refresh or sleep(e.g. Heroku) will be clean.

## Environment variables

```bash
cp .env.example .env
```

### Modify `.env`

- Login LINE Developer Console.
- Create a Messaging API channel.
- Input channel information.
- Copy Channel secret and Channel access token for environment `LINE_ACCESS_TOKEN` and `LINE_CHANNEL_SECRET` variables.

## `npm run dev`

You would get a webhook url and you need to copy it to your LINE Bot webhook url column.

Then you could test Webhooker. 🙂

## Trigger event

- set {BOT_CHANNEL_TOKEN}
- get
- url {WEBHOOK_URL}

## `npm start`

Runs the app in production mode.<br>
By default, server runs on [http://localhost:5000](http://localhost:5000).

```sh
npm start
yarn start
```

## Heroku

- Fork and clone this project.
- Run `Heroku create` to build a machine.
- git push heroku master.
- Set your Channel's `LINE_ACCESS_TOKEN` and `LINE_CHANNEL_SECRET` into `Settings`➡️ `Reveal Config Vars`.
- Enjoy it!
