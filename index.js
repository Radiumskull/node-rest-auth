const express = require('express')
const session = require('express-session')
const passport = require('passport')
const cookieParser = require('cookie-parser');
const cors = require('cors');


//----Configure Express App----
const app = express()
app.use(cors())
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

app.use('/user', UserRoutes)

app.listen(8080)