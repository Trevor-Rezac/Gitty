/* eslint-disable no-console */
const exchangeCodeForToken = async (code) => {
  console.log(`Invoked mock function: exchangeCodeForToken(${code})`);
  return `mocked_token_for_code_${code}`;
};

const getGitHubProfile = async (token) => {
  console.log(`Invoked mock function: getGitHubProfile(${token})`);
  return {
    login: 'test_user',
    avatar_url: 'https://www.placecage.com/gif/200/200',
    email: 'test@email.com',
  };
};

module.exports = { exchangeCodeForToken, getGitHubProfile };
