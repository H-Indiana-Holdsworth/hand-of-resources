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

  it('creates a movie', async () => {
    const res = await request(app)
      .post('/api/v1/movies')
      .send({ title: 'tenet', genre: 'action' });

    expect(res.body).toEqual({
      id: '1',
      title: 'tenet',
      genre: 'action',
    });
  });
});
