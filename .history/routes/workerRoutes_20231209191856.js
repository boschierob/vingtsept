// workerRoutes.js
const express = require('express');
const router = express.Router();
const Worker = require('./models/worker');

// Route pour obtenir tous les travailleurs
router.get('/', async (req, res) => {
  try {
    const workers = await Worker.find();
    res.json(workers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route pour obtenir un travailleur par ID
router.get('/:id', async (req, res) => {
  try {
    const worker = await Worker.findById(req.params.id);
    res.json(worker);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route pour créer un nouveau travailleur
router.post('/', async (req, res) => {
  try {
    const newWorker = new Worker(req.body);
    const savedWorker = await newWorker.save();
    res.status(201).json(savedWorker);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route pour mettre à jour un travailleur
router.put('/:id', async (req, res) => {
  try {
    const updatedWorker = await Worker.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedWorker);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route pour supprimer un travailleur
router.delete('/:id', async (req, res) => {
  try {
    await Worker.findByIdAndDelete(req.params.id);
    res.json({ message: 'Travailleur supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
