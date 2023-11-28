const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const workerRoutes = require('./routes/workers');
const app = express();
const port = 3001; // Choisissez le port que vous souhaitez utiliser
const cors = require('cors'); 

// Middleware pour analyser les données JSON dans les requêtes
app.use(bodyParser.json());
app.use(cors({ origin: 'http://127.0.0.1:5500/' }));

mongoose.connect('mongodb+srv://bosc8088:yJDssmWidhb9FukP@first-bird.h5qbziz.mongodb.net/?retryWrites=true&w=majority');

app.use('/workers', workerRoutes);

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
});