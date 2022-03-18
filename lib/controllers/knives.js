const { Router } = require('express');
const Knife = require('../models/Knife');

module.exports = Router()
  //
  .post('/', async (req, res) => {
    const knife = await Knife.createKnife(req.body);
    res.send(knife);
  });
