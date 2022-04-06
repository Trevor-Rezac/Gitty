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

  static async insert({ title, body }) {
    const { rows } = await pool.query(
      `
    INSERT INTO
      posts(title, body)
    VALUES
      ($1, $2)
    RETURNING
      *`,
      [title, body]
    );

    const post = new Post(rows[0]);
    return post;
  }

  static async getAll() {
    const { rows } = await pool.query(`
    SELECT
      *
    FROM
      posts;`);

    if (!rows[0]) return null;
    const posts = rows.map((row) => new Post(row));
    return posts;
  }
};
