// MonthlySheet.js
const mongoose = require('mongoose');

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

const monthlySheetSchema = new mongoose.Schema({
  related_worker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Worker',
    required: true,
  },
  month: String,
  customers: [customerSchema],
});

const MonthlySheet = mongoose.model('MonthlySheet', monthlySheetSchema);

module.exports = MonthlySheet;
