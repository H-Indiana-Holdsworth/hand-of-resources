const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('hand-of-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a knife', async () => {
    const res = await request(app)
      .post('/api/v1/knives')
      .send({ brand: 'gerber', type: 'edc' });

    expect(res.body).toEqual({
      id: expect.any(String),
      brand: 'gerber',
      type: 'edc',
    });
  });
});
