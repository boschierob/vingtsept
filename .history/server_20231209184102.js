// server.js
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); 

const workerRoutes = require('./routes/workerRoutes');
const monthlySheetRoutes = require('./routes/monthlySheetRoutes');

const app = express();
const PORT = process.env.PORT || 3333;
const MONGODB_URI = 'mongodb+srv://bosc8088:yJDssmWidhb9FukP@first-bird.h5qbziz.mongodb.net/?retryWrites=true&w=majority'; 

// Middleware
app.use(bodyParser.json());
app.use(cors({ origin: 'http://127.0.0.1:5500' }));

// Routes
app.use('/api/workers', workerRoutes);
app.use('/api/monthlySheets', monthlySheetRoutes);

// Connexion à MongoDB
mongoose.connect(MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log('Connecté à MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Erreur de connexion à MongoDB:', err);
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
