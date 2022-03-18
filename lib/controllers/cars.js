const { Router } = require('express');
const Car = require('../models/Car');

module.exports = Router()
  //
  .post('/', async (req, res) => {
    const car = await Car.createCar(req.body);
    res.send(car);
  })

  .get('/', async (req, res) => {
    const cars = await Car.getAllCars();
    res.send(cars);
  });
