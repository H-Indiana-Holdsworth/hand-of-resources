const { Router } = require('express');
const Knife = require('../models/Knife');

module.exports = Router()
  //
  .post('/', async (req, res) => {
    const knife = await Knife.createKnife(req.body);
    res.send(knife);
  })

  .get('/', async (req, res) => {
    const knife = await Knife.getKnives();
    res.send(knife);
  })

  .get('/:id', async (req, res) => {
    const knife = await Knife.getKnifeById(req.params.id);
    res.send(knife);
  })

  .patch('/:id', async (req, res) => {
    const knife = await Knife.updateKnife(req.params.id, req.body);
    res.send(knife);
  })

  .delete('/:id', async (req, res) => {
    const knife = await Knife.deleteKnife(req.params.id);
    res.send(knife);
  });
