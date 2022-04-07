const fetch = require('cross-fetch');

const exchangeCodeForToken = (code) => {
  // const res = await fetch('https://github.com/login/oauth/access_token', {
  //   method: 'POST',
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     client_id: process.env.CLIENT_ID,
  //     client_secret: process.env.CLIENT_SECRET,
  //     code,
  //   }),
  // });

  // const { access_token } = await res.json();
  // return access_token;

  return fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code,
    }),
  })
    .then((res) => res.json())
    .then(({ access_token }) => access_token);
};

const getGitHubProfile = (token) => {
  // const resp = await fetch('https://api.github.com/user', {
  //   headers: {
  //     Authorization: `token ${token}`,
  //     Accept: 'application/json',
  //   },
  // });

  // const { avatar_url, login, email } = await resp.json();
  // return { username: login, photoUrl: avatar_url, email };

  return fetch('https://api.github.com/user', {
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/json',
    },
  })
    .then((res) => res.json())
    .then(({ avatar_url, login, email }) => {
      return { username: login, photoUrl: avatar_url, email };
    });
};

module.exports = { exchangeCodeForToken, getGitHubProfile };
