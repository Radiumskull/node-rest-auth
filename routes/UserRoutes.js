const router = require('express').Router();

//----DB and Models----
require('../config/mongoose')
const User = require('../models/User')

const jwt = require('jsonwebtoken')
const passport = require('passport')





router.post('/signup', passport.authenticate('signup',) , (req, res, next) => {
    res.send({
        'message' : 'Signup Successful',
        user : req.user
    })
})


router.post('/login', (req, res, next) => {
    const userData = req.body;
    if(!userData.username || !userData.password){
        res.status(500).send("Incomplete Data")
    } else {
        passport.authenticate('login', (err, user, info) => {
            try{
                if(err || !user){
                    const error = new Error('An Error Occured in the Middleware')
                    return next(error)
                }
                
                body = {id : user._id, username : user.username}
                req.login(user, {session : false}, async(error) => {
                    if(error) return next(error)
                    const token = await jwt.sign({user : body}, 'secret');
                    body = user.toAuthJSON()
                    body.token = token;
                    return res.send(body);
                })
            } catch(e){
                return next(error);
            }
        })(req, res, next);
    }
})

router.get('/', passport.authenticate('jwt',), (req, res, next) => {
    res.send({
        message : "You are Logged In!",
        user : req.user
    })
})


module.exports = router