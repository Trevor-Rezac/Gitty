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

  static async insert({ username, email, avatar }) {
    if (!username) throw new Error('A username is required.');

    const { rows } = await pool.query(
      `
    INSERT INTO
      users(username, email, avatar)
    VALUES
      ($1, $2, $3)
    RETURNING
      *`,
      [username, email, avatar]
    );

    if (!rows[0]) return null;
    return new GitHubUser(rows[0]);
  }

  static async getByUsername(username) {
    const { rows } = await pool.query(
      `
    SELECT
      *
    FROM
      users
    WHERE
      username=$1
    `,
      [username]
    );

    if (!rows[0]) return null;
    return new GitHubUser(rows[0]);
  }
};
