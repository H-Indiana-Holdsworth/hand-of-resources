const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Car = require('../lib/models/Car');

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

  it('gets all cars', async () => {
    const car1 = await Car.createCar({
      brand: 'ford',
      type: 'suv',
    });

    const car2 = await Car.createCar({
      brand: 'chevy',
      type: 'sedan',
    });

    const res = await request(app).get('/api/v1/cars');

    expect(res.body).toEqual([car1, car2]);
  });

  it('gets a car', async () => {
    const car = await Car.createCar({ brand: 'ford', type: 'suv' });
    const res = await request(app).get(`/api/v1/cars/${car.id}`);

    expect(res.body).toEqual(car);
  });

  it('updates a car', async () => {
    const car = await Car.createCar({
      brand: 'ford',
      type: 'suv',
    });

    const res = await request(app)
      .patch(`/api/v1/cars/${car.id}`)
      .send({ brand: 'ford', type: 'sedan' });

    const expected = {
      brand: 'ford',
      type: 'sedan',
    };

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('deletes a car', async () => {
    const car = await Car.createCar({ brand: 'ford', type: 'suv' });
    const res = request(app).delete(`/api/v1/${car.id}`);

    expect(res.body).toEqual(car);
  });
});
