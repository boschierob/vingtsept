// Worker.js
const mongoose = require('mongoose');
const { customerSchema } = require('./Schemas.js');

const workerSchema = new mongoose.Schema({
  nom: String,
  email: { type: String, required: true, unique: true },
  telephone: String,
  motDePasse: { type: String, required: true },
  statut: { type: String, enum: ['Admin', 'Manager', 'Employee', 'External'] },
  customers: [customerSchema],
  monthlySheets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MonthlySheet',
  }],
});

const Worker = mongoose.model('Worker', workerSchema);

module.exports = Worker;
