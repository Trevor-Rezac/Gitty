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

  static async getAll() {
    const { rows } = await pool.query(`
    SELECT
      *
    FROM
      posts;`);

    const posts = rows.map((row) => new Post(row));
    return posts;
  }
};
