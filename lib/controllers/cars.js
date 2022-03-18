const { Router } = require('express');
const Car = require('../models/Car');

module.exports = Router()
  //
  .post('/', async (req, res) => {
    const car = await Car.createCar(req.body);
    res.send(car);
  });
