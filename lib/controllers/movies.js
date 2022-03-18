const { Router } = require('express');
const Movie = require('../models/Movie');

module.exports = Router()
  //
  .post('/', async (req, res) => {
    const movie = await Movie.insert(req.body);
    res.send(movie);
  })

  .get('/', async (req, res) => {
    const movies = await Movie.getAll();
    res.send(movies);
  })

  .get('/:id', async (req, res) => {
    const movie = await Movie.getById(req.params.id);
    res.send(movie);
  })

  .patch('/:id', async (req, res) => {
    const movie = await Movie.update(req.params.id, req.body);
    res.send(movie);
  });
