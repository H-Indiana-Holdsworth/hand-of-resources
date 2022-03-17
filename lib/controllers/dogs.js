const { Router } = require('express');
const Dog = require('../models/Dog');

module.exports = Router()
  //
  .post('/', async (req, res) => {
    const dog = await Dog.insert(req.body);
    res.send(dog);
  })

  .get('/', async (req, res) => {
    const dogs = await Dog.getAll();
    res.send(dogs);
  })

  .get('/:id', async (req, res) => {
    const dog = await Dog.getById(req.params.id);
    res.send(dog);
  })

  .patch('/:id', async (req, res) => {
    const dog = await Dog.updateById(req.params.id, req.body);
    res.send(dog);
  });
