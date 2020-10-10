const { router, text } = require('bottender/router');
const axios = require('axios');
async function setState(context, { match }) {
  const token = match.groups.token;
  let id = '';

  if (context._session.user) {
    id = context._session.user.id;
  } else if (context._session.group) {
    id = context._session.group.id;
  } else if (context._session.room) {
    id = context._session.room.id;
  }
  context.setState({
    id: { token },
  });
  const url = 'https://api.line.me/v2/bot/channel/webhook/endpoint';
  const headers = {
    Authorization: `Bearer ${process.env.LINE_ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  };
  const res = await axios.get(url, { headers });
  console.log(res.data);
  await context.sendText(
    `Welcome ${id}\n ${res.data.endpoint} \n ${res.data.active}`
  );
}
async function testAction(context) {
  await context.sendFlex('hi', {
    type: 'bubble',
    hero: {
      type: 'image',
      url:
        'https://raw.githubusercontent.com/louis70109/Webhooker/master/sample.png',
      size: 'full',
      aspectRatio: '20:13',
      aspectMode: 'cover',
      action: {
        type: 'uri',
        uri: 'http://linecorp.com/',
      },
      animated: true,
    },
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'text',
          text: 'Brown Cafe',
          weight: 'bold',
          size: 'xl',
        },
        {
          type: 'box',
          layout: 'baseline',
          margin: 'md',
          contents: [
            {
              type: 'icon',
              size: 'sm',
              url:
                'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png',
            },
            {
              type: 'icon',
              size: 'sm',
              url:
                'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png',
            },
            {
              type: 'icon',
              size: 'sm',
              url:
                'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png',
            },
            {
              type: 'icon',
              size: 'sm',
              url:
                'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png',
            },
            {
              type: 'icon',
              size: 'sm',
              url:
                'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gray_star_28.png',
            },
            {
              type: 'text',
              text: '4.0',
              size: 'sm',
              color: '#999999',
              margin: 'md',
              flex: 0,
            },
          ],
        },
        {
          type: 'box',
          layout: 'vertical',
          margin: 'lg',
          spacing: 'sm',
          contents: [
            {
              type: 'box',
              layout: 'baseline',
              spacing: 'sm',
              contents: [
                {
                  type: 'text',
                  text: 'Place',
                  color: '#aaaaaa',
                  size: 'sm',
                  flex: 1,
                },
                {
                  type: 'text',
                  text: 'Miraina Tower, 4-1-6 Shinjuku, Tokyo',
                  wrap: true,
                  color: '#666666',
                  size: 'sm',
                  flex: 5,
                },
              ],
            },
            {
              type: 'box',
              layout: 'baseline',
              spacing: 'sm',
              contents: [
                {
                  type: 'text',
                  text: 'Time',
                  color: '#aaaaaa',
                  size: 'sm',
                  flex: 1,
                },
                {
                  type: 'text',
                  text: '10:00 - 23:00',
                  wrap: true,
                  color: '#666666',
                  size: 'sm',
                  flex: 5,
                },
              ],
            },
          ],
        },
      ],
    },
    footer: {
      type: 'box',
      layout: 'vertical',
      spacing: 'sm',
      contents: [
        {
          type: 'button',
          style: 'link',
          height: 'sm',
          action: {
            type: 'uri',
            label: 'CALL',
            uri: 'https://linecorp.com',
          },
        },
        {
          type: 'button',
          style: 'link',
          height: 'sm',
          action: {
            type: 'uri',
            label: 'WEBSITE',
            uri: 'https://linecorp.com',
          },
        },
        {
          type: 'spacer',
          size: 'sm',
        },
      ],
      flex: 0,
    },
  });
}
module.exports = async function App() {
  return router([
    text(/set\s*(?<token>[\s\S]+)/, setState),
    text('a', testAction),
  ]);
};
