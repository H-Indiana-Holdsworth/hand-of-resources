const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Movie = require('../lib/models/Movie');

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
      id: expect.any(String),
      title: 'tenet',
      genre: 'action',
    });
  });

  it('gets all movies', async () => {
    const movie1 = await Movie.insert({
      title: 'tenet',
      genre: 'action',
    });

    const movie2 = await Movie.insert({
      title: 'avengers',
      genre: 'action',
    });

    const res = await request(app).get('/api/v1/movies');

    expect(res.body).toEqual([movie1, movie2]);
  });
});
