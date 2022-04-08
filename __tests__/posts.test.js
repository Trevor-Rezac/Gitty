const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/utils/github');

describe('posts routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it.skip('should list all posts for all users', async () => {
    const agent = request.agent(app);

    const res = await agent
      .get('/api/v1/github/login/callback?code=11')
      .redirects(1);

    expect(res.body).toEqual([
      {
        id: expect.any(String),
        title: 'Test Title',
        body: 'Test post',
      },
    ]);
  });

  it.skip('should allow an authenticated user to create a new post', async () => {
    const agent = request.agent(app);

    await agent.get('/api/v1/github/login/callback?code=11').redirects(1);

    const res = await agent.post('/api/v1/posts').send({
      title: 'New Title',
      body: 'New Post',
    });

    expect(res.body).toEqual({
      id: expect.any(String),
      title: 'New Title',
      body: 'New Post',
    });
  });
});
