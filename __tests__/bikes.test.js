const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const { getAll } = require('../lib/models/Dog');
const { insert } = require('../lib/models/Bike');

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
    const bike1 = await insert({
      brand: 'ktm',
      type: 'dirt',
    });

    const bike2 = await insert({
      brand: 'honda',
      type: 'street',
    });

    const res = await request(app).get('/api/v1/bikes');

    expect(res.body).toEqual([bike1, bike2]);
  });

  it('gets a bike by id', async () => {
    const bike = await insert({ brand: 'ktm', type: 'dirt' });
    const res = await request(app).get(`/api/v1/bikes/${bike.id}`);

    expect(res.body).toEqual(bike);
  });

  it('updates a bike', async () => {
    const bike = await insert({ brand: 'ktm', type: 'dirt' });
    const res = await request(app)
      .patch(`/api/v1/bikes/${bike.id}`)
      .send({ brand: 'ktm', type: 'street' });

    const expected = {
      brand: 'ktm',
      type: 'street',
    };

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });
});
