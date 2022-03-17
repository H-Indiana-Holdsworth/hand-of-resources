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

  it('creates a bike', async () => {
    const res = await request(app)
      .post('/api/v1/bikes')
      .send({ brand: 'ktm', type: 'dirt' });

    expect(res.body).toEqual({
      id: expect.any(String),
      brand: 'ktm',
      type: 'dirt',
    });
  });

  it('get all bikes', async () => {
    const bikes = [
      {
        brand: 'ktm',
        type: 'dirt',
      },
      {
        brand: 'honda',
        type: 'street',
      },
    ];
    const res = await request(app).get('/api/v1/bikes');

    expect(res.body).toEqual(bikes);
  });
});
