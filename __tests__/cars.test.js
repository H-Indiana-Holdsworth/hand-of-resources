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

  it('creates a car', async () => {
    const res = await request(app)
      .post('/api/v1/cars')
      .send({ brand: 'ford', type: 'suv' });

    expect(res.body).toEqual({
      id: expect.any(String),
      brand: 'ford',
      type: 'suv',
    });
  });
});
