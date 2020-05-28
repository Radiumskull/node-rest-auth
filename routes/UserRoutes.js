const router = require('express').Router();

//----DB and Models----
require('../config/mongoose')
const User = require('../models/User')

const auth = require('./auth');
const passport = require('passport')





router.post('/signup', auth.optional, async (req, res) => {
    const userData = req.body;
    if(!userData.username || !userData.name || !userData.password){
        res.status(500).send('Incomplete Data');
    } else {
        const user = new User({
            name : userData.name,
            username : userData.username,
        })
        try{ 
           await user.setPassword(userData.password)
           await user.save()
           res.send(user.toAuthJSON())
        } catch(e){
            res.status(400).send(user)
        }
    }
})


router.post('/login', auth.optional, (req, res, next) => {
    const { body : {userData }} = req;
    if(!userData.username || !userData.password){
        res.status(500).send("Incomplete Data")
    } else {
        return passport.authenticate('local', { session : false} , (err, passportUser, info) => {
            if(err){
                return res.;
            }

            if(passportUser){
                const user = passportUser;
                user.token = passportUser.generateJWT()

                return res.send(user);
            }

            return status(400).info;
        })(req, res, next);
    }
})

module.exports = router