const express = require('express')
const session = require('express-session')
const passport = require('passport')

//----Configure Express App----
const app = express()
app.use(express.json())
app.use(session({
    secret : 'secret',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
require('./config/passport');

//----Set Routes----
const UserRoutes = require('./routes/UserRoutes')

app.use('', UserRoutes)

app.listen(8080)