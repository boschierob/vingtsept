
const express = require('express');
const router = express.Router();
const Worker = require('../models/Worker');

// Route pour récupérer tous les travailleurs
router.get('/', async (req, res) => {
  try {
    const workers = await Worker.find();
    res.json(workers);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Route pour récupérer les données d'un travailleur par son ID
router.get('/:workerId', async (req, res) => {
    const { workerId } = req.params;
  
    try {
      const worker = await Worker.findById(workerId);
      if (!worker) {
        return res.status(404).json({ message: 'Worker not found' });
      }
  
      res.json(worker);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });


// Route pour ajouter un nouveau travailleur
router.post('/', async (req, res) => {
    console.log(req.body);
  try {
    const newWorker = await Worker.create(req.body);
    res.json(newWorker);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;