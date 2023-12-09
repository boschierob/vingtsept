const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const mongoose = require('mongoose');

const Worker = require('./models/Worker');

function initialize(passport) {
    const authenticateWorker = async (email, password, done) => {
        console.log('Tentative d\'authentification avec email:', email);
        try {
            const Worker = await Worker.findOne({ email: email });

            if (!Worker) {
                console.log('no worker with that email');
                return done(null, false, { message: 'No Worker with that email' });
            }

            const isPasswordMatch = await bcrypt.compare(password, Worker.motDePasse);
            console.log('Password Match :' + isPasswordMatch);
            if (isPasswordMatch) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Password incorrect' });
            }
        } catch (error) {
            return done(error);
        }


    }

    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateWorker))
    passport.serializeUser((worker, done) => {
        done(null, worker.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
          const worker = await Worker.findById(id);
          return done(null, worker);
        } catch (error) {
          return done(error);
        }
     
    });

}

module.exports = initialize;