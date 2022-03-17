const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const { insert, getById } = require('../lib/models/Dog');

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

  it('gets dog by id', async () => {
    const dog = await insert({ name: 'gus', type: 'energetic' });
    const res = await request(app).get(`/api/v1/dogs/${dog.id}`);

    expect(res.body).toEqual(dog);
  });

  it('updates a dog', async () => {
    const dog = await insert({ name: 'gus', type: 'energetic' });
    const res = await request(app).patch(`/api/v1/dogs/${dog.id}`).send({
      name: 'roxy',
      type: 'lazy',
    });

    const expected = {
      id: expect.any(String),
      name: 'roxy',
      type: 'lazy',
    };

    expect(res.body).toEqual(expected);
    expect(await getById(dog.id)).toEqual(expected);
  });

  it('deletes a dog', async () => {
    const dog = await insert({ name: 'gus', type: 'energetic' });
    const res = await request(app).delete(`/api/v1/dogs/${dog.id}`);

    expect(res.body).toEqual(dog);
  });
});
