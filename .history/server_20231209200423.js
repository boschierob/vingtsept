// server.js
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const session =require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); 

const Worker = require('./models/Worker');

const initializePassport = require('./passport-config')
initializePassport(
  passport
)

const workerRoutes = require('./routes/workerRoutes');
const monthlySheetRoutes = require('./routes/monthlySheetRoutes');

const app = express();
const PORT = process.env.PORT || 3333;
const MONGODB_URI = 'mongodb+srv://bosc8088:yJDssmWidhb9FukP@first-bird.h5qbziz.mongodb.net/?retryWrites=true&w=majority'; 

// Middleware
app.set('view-engine', 'ejs');
app.set('views', './views');
app.use(bodyParser.json());
app.use(cors({ origin: 'http://127.0.0.1:5500' }));
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/workers', workerRoutes);
app.use('/api/monthlySheets', monthlySheetRoutes);

// Route pour afficher le formulaire d'inscription
app.get('/login', (req, res) => {
  res.render('login.ejs'); // Assurez-vous d'avoir un fichier de modèle (pug, ejs, etc.) pour votre formulaire d'inscription
});

// Route pour afficher le formulaire d'inscription
app.get('/register', (req, res) => {
  res.render('register'); // Assurez-vous d'avoir un fichier de modèle (pug, ejs, etc.) pour votre formulaire d'inscription
});

// Route POST pour traiter les données d'inscription
app.post('/register', async (req, res) => {
  const { nom, email, motDePasse, statut } = req.body;

  try {
    const existingWorker = await Worker.findOne({ email: email });

    if (existingWorker) {
      return res.render('register', { message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(motDePasse, 10);

    const newWorker = new Worker({
      nom: nom,
      email: email,
      motDePasse: hashedPassword,
      statut: statut
      // Ajoutez d'autres champs si nécessaire
    });

    await newWorker.save();
    res.json({ message: 'ok new worker registered'})
   // res.redirect('/login'); // Redirigez l'utilisateur vers la page de connexion après l'inscription réussie
  } catch (error) {
    console.error(error);
   // res.render('register', { message: 'Error during registration' });
   res.json({ message : 'error occured during registering'})
  }
});

app.post('/login',
  passport.authenticateWorker('local', { successRedirect: '/dashboard', failureRedirect: '/login' })
);

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
