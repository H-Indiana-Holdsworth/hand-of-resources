const { Router } = require('express');
const Dog = require('../models/Dog');

module.exports = Router().post('/', async (req, res) => {
  const dog = await Dog.insert(req.body);
  res.send(dog);
});
