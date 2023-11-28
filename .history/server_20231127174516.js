const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000; // Choisissez le port que vous souhaitez utiliser

// Middleware pour analyser les données JSON dans les requêtes
app.use(bodyParser.json());

// Définir une route pour la récupération des données Workers
app.get('/workers', (req, res) => {
    // Code pour récupérer les données des travailleurs (à implémenter)
    res.send('Endpoint de récupération des travailleurs');
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
});