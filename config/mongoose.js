const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/flipmarket', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}).then(res => {
    console.log("Connected to Database");
}).catch(err => {
    console.log(err);
});