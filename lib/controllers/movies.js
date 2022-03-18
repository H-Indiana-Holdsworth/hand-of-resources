const { Router } = require('express');

module.exports = Router()
  //
  .post('/', async (req, res) => {
    res.send({ id: '1', title: 'tenet', genre: 'action' });
  });
