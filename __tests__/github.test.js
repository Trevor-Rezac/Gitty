const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/utils/github');

describe('Gitty routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should redirect user to github oauth page when logging in', async () => {
    const req = await request(app).get('/api/v1/github/login');

    expect(req.header.location).toMatch(
      /https:\/\/github.com\/login\/oauth\/authorize\?client_id=[\w\d]+&scope=user&redirect_uri=http:\/\/localhost:7890\/api\/v1\/github\/login\/callback/i
    );
  });

  it('should login and redirect users to back to posts', async () => {
    const agent = request.agent(app);

    const req = await agent
      .get('/api/v1/github/login/callback?code=11')
      .redirects(1);
    expect(req.req.path).toEqual('/api/v1/posts');
  });

  it('should sign out a user by deleting the cookie', async () => {
    const agent = request.agent(app);

    await agent.get('/api/v1/github/login/callback?code=11').redirects(1);

    const res = await agent.delete('/api/v1/github/login/callback?code=11');

    expect(res.body).toEqual({
      success: true,
      message: 'Signed out successfully!',
    });
  });
});
