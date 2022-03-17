const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const { insert } = require('../lib/models/Dog');

describe('hand-of-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a dog', async () => {
    const res = await request(app)
      .post('/api/v1/dogs')
      .send({ name: 'gus', type: 'energetic' });

    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'gus',
      type: 'energetic',
    });
  });

  it('gets all dogs', async () => {
    await insert({ name: 'gus', type: 'energetic' });
    const res = await request(app).get('/api/v1/dogs');

    expect(res.body).toEqual([
      {
        id: expect.any(String),
        name: 'gus',
        type: 'energetic',
      },
    ]);
  });
});
