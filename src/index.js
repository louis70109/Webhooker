const { router, text } = require('bottender/router');
const axios = require('axios');

function completeAction(text) {
  return {
    type: 'bubble',
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'image',
              url:
                'https://s3-ap-southeast-1.amazonaws.com/image.nijia.lin/ezgif.com-gif-maker+(1).png',
              aspectMode: 'fit',
              animated: true,
            },
          ],
          background: {
            type: 'linearGradient',
            angle: '45deg',
            startColor: '#FFFF00',
            endColor: '#0080ff',
          },
        },
        {
          type: 'text',
          text,
          weight: 'bold',
          size: 'xl',
          wrap: true,
        },
      ],
    },
  };
}
async function getBotInfo(context) {
  let id = '';
  if (context._session.group) {
    id = context._session.group.id;
  } else if (context._session.room) {
    id = context._session.room.id;
  } else if (context._session.user) {
    id = context._session.user.id;
  }
  const obj = context.state[id];
  if (!obj) await context.sendText('Please set your channel.');
  else {
    const url = 'https://api.line.me/v2/bot/info';
    const headers = {
      Authorization: `Bearer ${obj.token}`,
      'Content-Type': 'application/json',
    };
    try {
      const res = await axios.get(url, { headers });

      await context.sendFlex(
        'Result',
        completeAction(`${JSON.stringify(res.data)}`)
      );
    } catch (error) {
      await context.sendText(`${error}`);
    }
  }
}
async function verifyWebhookUrl(context) {
  let id = '';
  if (context._session.group) {
    id = context._session.group.id;
  } else if (context._session.room) {
    id = context._session.room.id;
  } else if (context._session.user) {
    id = context._session.user.id;
  }
  const obj = context.state[id];
  if (!obj) await context.sendText('Please set your channel.');
  else {
    try {
      const getUrl = 'https://api.line.me/v2/bot/channel/webhook/endpoint';
      const headers = {
        Authorization: `Bearer ${obj.token}`,
        'Content-Type': 'application/json',
      };
      const res = await axios.get(getUrl, { headers });
      const verifyUrl = 'https://api.line.me/v2/bot/channel/webhook/test';
      const verifyRes = await axios.post(
        verifyUrl,
        { endpoint: res.data.endpoint },
        { headers }
      );

      await context.sendFlex(
        'Result',
        completeAction(`${JSON.stringify(verifyRes.data)}`)
      );
    } catch (error) {
      await context.sendText(`${error}`);
    }
  }
}
async function setBotState(context, { match }) {
  const token = match.groups.token;
  let id = '';
  const state = context.state;

  if (context._session.group) {
    id = context._session.group.id;
  } else if (context._session.room) {
    id = context._session.room.id;
  } else if (context._session.user) {
    id = context._session.user.id;
  }
  state[id] = { token };
  context.setState(state);

  await context.sendText(`${id} 
set 
${token} 
success.`);
}
async function putWebhookUrl(context, { match }) {
  const endpoint = match.groups.endpoint;

  let id = '';
  if (context._session.group) {
    id = context._session.group.id;
  } else if (context._session.room) {
    id = context._session.room.id;
  } else if (context._session.user) {
    id = context._session.user.id;
  }
  const obj = context.state[id];
  if (!obj) await context.sendText('Please set your channel!');
  else {
    const url = 'https://api.line.me/v2/bot/channel/webhook/endpoint';
    const headers = {
      Authorization: `Bearer ${obj.token}`,
      'Content-Type': 'application/json',
    };
    try {
      await axios.put(url, { endpoint }, { headers });
      await context.sendText(`${endpoint} set ok!`);
    } catch (error) {
      await context.sendText(error);
    }
  }
}
async function getBotState(context) {
  let id = '';
  if (context._session.group) {
    id = context._session.group.id;
  } else if (context._session.room) {
    id = context._session.room.id;
  } else if (context._session.user) {
    id = context._session.user.id;
  }
  const obj = context.state[id];
  if (!obj) await context.sendText('Please set your channel.');
  else {
    const url = 'https://api.line.me/v2/bot/channel/webhook/endpoint';
    const headers = {
      Authorization: `Bearer ${obj.token}`,
      'Content-Type': 'application/json',
    };
    try {
      const res = await axios.get(url, { headers });

      await context.sendFlex(
        'Result',
        completeAction(`${JSON.stringify(res.data)}`)
      );
    } catch (error) {
      await context.sendText(`${error}`);
    }
  }
}
module.exports = async function App() {
  return router([
    text(/set\s*(?<token>[\s\S]+)/, setBotState),
    text('get', getBotState),
    text('verify', verifyWebhookUrl),
    text(/url\s*(?<endpoint>[\s\S]+)/, putWebhookUrl),
    text('now', getBotInfo),
  ]);
};
