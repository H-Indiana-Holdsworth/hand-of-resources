const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Knife = require('../lib/models/Knife');

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

  it('gets all knives', async () => {
    const knife1 = await Knife.createKnife({
      brand: 'gerber',
      type: 'edc',
    });

    const knife2 = await Knife.createKnife({
      brand: 'pro tech',
      type: 'pocket',
    });

    const res = await request(app).get('/api/v1/knives');

    expect(res.body).toEqual([knife1, knife2]);
  });

  it('gets a knife', async () => {
    const knife = await Knife.createKnife({ brand: 'gerber', type: 'edc' });
    const res = await request(app).get(`/api/v1/knives/${knife.id}`);

    expect(res.body).toEqual({ knife });
  });
});
