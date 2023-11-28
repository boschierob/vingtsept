const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const workerRoutes = require('./routes/workers');
const app = express();
const port = 3001; // Choisissez le port que vous souhaitez utiliser


// Middleware pour analyser les données JSON dans les requêtes
app.use(bodyParser.json());

// Définir une route pour la récupération des données Workers
app.get('/', (req, res) => {
    // Code pour récupérer les données des travailleurs (à implémenter)
    res.send('Endpoint général');
});

mongoose.connect('mongodb+srv://bosc8088:yJDssmWidhb9FukP@first-bird.h5qbziz.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/workers', workerRoutes);

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
});