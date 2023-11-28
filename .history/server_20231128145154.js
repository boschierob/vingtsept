const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const workerRoutes = require('./routes/workers');
const app = express();
const port = 3001; // Choisissez le port que vous souhaitez utiliser
const cors = require('cors'); 



// Middleware pour analyser les données JSON dans les requêtes
app.use(bodyParser.json());
app.use(cors({ origin: 'http://127.0.0.1:5500' }));

mongoose.connect('mongodb+srv://bosc8088:yJDssmWidhb9FukP@first-bird.h5qbziz.mongodb.net/?retryWrites=true&w=majority');

app.use('/workers', workerRoutes);

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); 

const workerRoutes = require('./routes/workerRoutes');
const monthlySheetRoutes = require('./routes/monthlySheetRoutes');

const app = express();
const PORT = process.env.PORT || 3001;
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
