// monthlySheetRoutes.js
const express = require('express');
const router = express.Router();
const MonthlySheet = require('../models/MonthlySheet');

// Fonction pour créer une nouvelle feuille mensuelle
const createMonthlySheet = async (req, res) => {
    try {
      const newMonthlySheet = new MonthlySheet(req.body);
      const savedMonthlySheet = await newMonthlySheet.save();
  
      // Ajouter l'ID de la nouvelle feuille mensuelle à la liste des monthlySheets du Worker
      const workerId = req.body.related_worker;
      await Worker.findByIdAndUpdate(workerId, {
        $push: { monthlySheets: savedMonthlySheet._id }
      });
  
      res.status(201).json(savedMonthlySheet);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };


// Route pour obtenir toutes les feuilles mensuelles
router.get('/', async (req, res) => {
  try {
    const monthlySheets = await MonthlySheet.find();
    res.json(monthlySheets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route pour obtenir une feuille mensuelle par ID
router.get('/:id', async (req, res) => {
  try {
    const monthlySheet = await MonthlySheet.findById(req.params.id);
    res.json(monthlySheet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route pour créer une nouvelle feuille mensuelle
router.post('/', createMonthlySheet);

// Route pour mettre à jour une feuille mensuelle
router.put('/:id', async (req, res) => {
  try {
    const updatedMonthlySheet = await MonthlySheet.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedMonthlySheet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route pour supprimer une feuille mensuelle
router.delete('/:id', async (req, res) => {
  try {
    await MonthlySheet.findByIdAndDelete(req.params.id);
    res.json({ message: 'Feuille mensuelle supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
