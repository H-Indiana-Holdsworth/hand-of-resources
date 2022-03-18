const { Router } = require('express');
const Bike = require('../models/Bike');

module.exports = Router()
  //
  .post('/', async (req, res) => {
    const bike = await Bike.insert(req.body);
    res.send(bike);
  })

  .get('/', async (req, res) => {
    const bikes = await Bike.getAll();
    res.send(bikes);
  });
