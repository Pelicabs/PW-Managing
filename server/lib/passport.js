var passport = require('passport');
var LocalStrategy = require('passport-local');
const { Users } = require('./database');



passport.use(new LocalStrategy(async function verify(username, password, cb) {
    const query = { username: username}
    const guy = await Users.findOne(query)
   
    if (!guy || guy.password !== password) {
        return cb(null, false, { message: 'Incorrect username or password.' })
    }
    return cb(null, guy)

}));