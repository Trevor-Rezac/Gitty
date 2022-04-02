module.exports = class Post {
  id;
  title;
  body;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.body = row.body;
  }
};
