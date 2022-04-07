const pool = require('../utils/pool');

module.exports = class Post {
  id;
  title;
  body;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.body = row.body;
  }

  static insert({ title, body }) {
    return pool
      .query(
        `
    INSERT INTO
      posts(title, body)
    VALUES
      ($1, $2)
    RETURNING
      *`,
        [title, body]
      )
      .then(({ rows }) => new Post(rows[0]));
  }

  static getAll() {
    return pool
      .query(
        `
    SELECT
      *
    FROM
      posts;`
      )
      .then(({ rows }) => rows.map((row) => new Post(row)))
      .catch(() => null);
  }
};
