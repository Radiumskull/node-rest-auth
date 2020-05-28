const express = require('express')
const session = require('express-session')
const passport = require('passport')
const cookieParser = require('cookie-parser');

//----Configure Express App----
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(session({
    secret : 'secret',
    expires: new Date(Date.now() + (30 * 86400 * 1000)),
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