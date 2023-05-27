const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/User.model')
const bcrypt = require('bcrypt')
const saltRounds = 10;

passport.use(new LocalStrategy({
        usernameField: 'email',
        passportField: 'password',
    }, async function verify(email, password, cb) {
    const user = await User.findOne({ email })

    if (!user || !await bcrypt.compare(password, user.hashedPW)) {
        return cb(null, false, { message: 'Incorrect username or password.' })
    }
    return cb(null, user)
}));

passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback: true
  }, async (req, email, password, done) => {
    try {
        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return done('User already exists')
        }

        const hashedPW = await bcrypt.hash(password, saltRounds);
        const user = await User.create({ email, hashedPW });
        return done(null, user);
    } catch (error) {
        done(error);
    } 
  }));

passport.serializeUser((user, done) => {
    done(null, user._id);
})

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => done(null, user))
        .catch(done)
})
