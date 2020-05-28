const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/node-rest-auth', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});