const pool = require('../utils/pool');

module.exports = class GitHubUser {
  id;
  username;
  email;
  avatar;

  constructor(row) {
    this.id = row.id;
    this.username = row.username;
    this.email = row.email;
    this.avatar = row.avatar;
  }

  static insert({ username, email, avatar }) {
    if (!username) throw new Error('A username is required.');

    return pool
      .query(
        `
    INSERT INTO
      users(username, email, avatar)
    VALUES
      ($1, $2, $3)
    RETURNING
      *`,
        [username, email, avatar]
      )
      .then(({ rows }) => new GitHubUser(rows[0]))
      .catch(() => null);
  }

  static getByUsername(username) {
    return pool
      .query(
        `
    SELECT
      *
    FROM
      users
    WHERE
      username=$1
    `,
        [username]
      )
      .then(({ rows }) => new GitHubUser(rows[0]))
      .catch(() => null);
  }
};
