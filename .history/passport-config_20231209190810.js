const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const mongoose = require('mongoose');

const Worker = require('./models/Worker');

function initialize(passport) {
    const authenticateWorker = async (email, password, done) => {
        try {
            const Worker = await Worker.findOne({ email: email });

            if (!Worker) {
                return done(null, false, { message: 'No Worker with that email' });
            }

            const isPasswordMatch = await bcrypt.compare(password, Worker.password);

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
    passport.serializeUser((user, done) => done(null, user.id))
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