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
    console.log('req.req.path: ', req.req.path);
    expect(req.req.path).toEqual('/api/v1/posts');
  });

  it('should list all posts for all users', async () => {});
});
