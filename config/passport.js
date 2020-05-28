const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');


passport.use(new LocalStrategy({
    usernameField : 'user[username]',
    passwordField : 'user[password]'
}, async (username, password, done) => {
    try{
        const user = await User.find({ username })
        if(!user){
            return done(null, false, { errors : {'username' : 'is invalid'}});
        }
    
        if(!user.validatePassword(password)){
            return done(null, false, { errors : {'password' : 'is wrong'}});
        }
    
        return done(null, user);
    } catch(e) {
        return done(e);
    }
}))