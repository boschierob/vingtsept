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

app.get('/test', (req, res) => {
    try {
        findOneListingByName(client, "Infinite Views");
        res.send('Endpoint général');
    } catch (error) {
        console.log(error);
    }
});

async function findOneListingByName(client, nameOfListing) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").findOne({ name: nameOfListing });

    if (result) {
        console.log(`Found a listing in the collection with the name '${nameOfListing}':`);
        console.log(result);
    } else {
        console.log(`No listings found with the name '${nameOfListing}'`);
    }
}

mongoose.connect('mongodb+srv://bosc8088:yJDssmWidhb9FukP@first-bird.h5qbziz.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/workers', workerRoutes);

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
});