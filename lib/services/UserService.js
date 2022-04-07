const GitHubUser = require('../models/GitHubUser');
const { exchangeCodeForToken, getGitHubProfile } = require('../utils/github');

module.exports = class UserService {
  static async create(code) {
    // const token = await exchangeCodeForToken(code);
    // const profile = await getGitHubProfile(token);
    // let user = await GitHubUser.getByUsername(profile.login);
    // if (!user) {
    //   user = await GitHubUser.insert({
    //     username: profile.login ?? profile.username,
    //     email: profile.email,
    //     avatar: profile.avatar_url ?? profile.photoUrl,
    //   });
    // }
    // return user;
    let gitHubProfile;

    return exchangeCodeForToken(code)
      .then((token) => getGitHubProfile(token))
      .then((profile) => {
        gitHubProfile = profile;
        return GitHubUser.getByUsername(profile.login);
      })
      .then((user) => {
        if (!user) {
          return GitHubUser.insert({
            username: gitHubProfile.login ?? gitHubProfile.username,
            email: gitHubProfile.email,
            avatar: gitHubProfile.avatar_url ?? gitHubProfile.photoUrl,
          });
        }
        return user;
      });
  }
};
