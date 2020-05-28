const express = require('express')


//----Configure Express App----
const app = express()
app.use(express.json())


//----Set Routes----
const UserRoutes = require('./routes/UserRoutes')

app.use('', UserRoutes)

app.listen(8080)