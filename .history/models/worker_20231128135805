// Worker.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const interventionSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  description: String,
});

const customerSchema = new mongoose.Schema({
  nom: String,
  email: String,
  telephone: String,
  interventions: [interventionSchema],
});

const workerSchema = new mongoose.Schema({
  nom: String,
  email: { type: String, required: true, unique: true },
  telephone: String,
  motDePasse: { type: String, required: true },
  statut: { type: String, enum: ['Actif', 'Inactif'] },
  customers: [customerSchema],
  monthlySheet: [mongoose.Schema.Types.ObjectId], // Référence aux feuilles mensuelles
});

// Fonction de hachage du mot de passe avant la sauvegarde du travailleur
workerSchema.pre('save', async function (next) {
  const worker = this;
  if (!worker.isModified('motDePasse')) return next();

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(worker.motDePasse, salt);
  worker.motDePasse = hash;
  next();
});

const Worker = mongoose.model('Worker', workerSchema);

module.exports = Worker;
