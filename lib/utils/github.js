const fetch = require('cross-fetch');

const exchangeCodeForToken = async (code) => {
  const res = await fetch('https://github.com/login/oauth/access_token', {
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
  });

  const { access_token } = await res.json();
  return access_token;
};

const getGitHubProfile = async (token) => {
  const resp = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/json',
    },
  });

  const { avatar_url, login, email } = await resp.json();
  return { username: login, photoUrl: avatar_url, email };
};

module.exports = { exchangeCodeForToken, getGitHubProfile };