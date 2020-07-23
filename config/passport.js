const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const keys = require('./keys');

const User = require('../models/User');

passport.use('signup', new LocalStrategy({
    name : 'name',
    usernameField : 'username',
    passwordField : 'password'
}, async (username, password, done) => {
    try{
        const user = User({
            username : username
        })
        await user.setPassword(password)
        await user.save()
        return done(null, user)
    } catch(e) {
        return done(e);
    }
}));

passport.use('login', new LocalStrategy({
    usernameField : 'username',
    passwordField : 'password'
}, async (username, password, done) => {
    try{
        const user = await User.findByCredentials(username, password);

        if(!user){
            return done(null, false);
        }
        return done(null, user);
    } catch(e) {
        return done(e, null);
    }
}))

passport.use('google', new GoogleStrategy({
    clientID: keys.google.clientId,
    clientSecret: keys.google.secret,
    callbackURL: "http://localhost:8080/user/oauth/google/callback"
  }, async function(request, accessToken, refreshToken, profile, done) {
      console.log(profile);
      console.log(keys.google.clientId);
    try{
        let user = await User.findOne({googleId : profile.id})
        if(user) return done(null, user);
        user = User({
            googleId : profile.id,
            name : profile.displayName,
            username : profile.email
        })
        await user.save();
        return done(null, user);

    }catch(err){
        done(err);
    }
  }
));

passport.use(new JWTStrategy({
    secretOrKey : 'secret',
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken()}, async(token, done) => {
        try{
            return done(null, token.user)
        } catch(e) {
            done(error);
        }
    }))

    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });