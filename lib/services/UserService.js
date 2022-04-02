const GitHubUser = require('../models/GitHubUser');
const { exchangeCodeForToken, getGitHubProfile } = require('../utils/github');

module.exports = class UserService {
  static async create(code) {
    const token = await exchangeCodeForToken(code);

    const profile = await getGitHubProfile(token);
    console.log('profile!!!: ', profile);

    let user = await GitHubUser.getByUsername(profile.login);

    if (!user) {
      user = await GitHubUser.insert({
        username: profile.login ?? profile.username,
        email: profile.email,
        avatar: profile.avatar_url ?? profile.photoUrl,
      });
    }

    return user;
  }
};
