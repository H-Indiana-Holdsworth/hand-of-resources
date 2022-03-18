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
  })

  .get('/:id', async (req, res) => {
    const car = await Car.getCarById(req.params.id);
    res.send(car);
  })

  .patch('/:id', async (req, res) => {
    const car = await Car.updateCar(req.params.id, req.body);
    res.send(car);
  })

  .delete('/:id', async (req, res) => {
    const car = await Car.deleteCar(req.params.id);
    res.send(car);
  });
