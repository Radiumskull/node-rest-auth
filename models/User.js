const mongoose = require('mongoose')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    username : {
        type : String,
        trim: true,
        required : true
    },
    password : {
        type : String,
    },
    salt: {
        type: String
    }
})
userSchema.validatePassword = function(passoword){
    const password = crypto.pbkdf2Sync(passoword, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.password === password;
} 
userSchema.methods.setPassword = function (password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.password = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
}

userSchema.methods.generateJWT = function() {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);
  
    return jwt.sign({
      email: this.email,
      id: this._id,
      exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, 'secret');
  }

userSchema.methods.toAuthJSON = function() {
return {
    _id: this._id,
    name: this.name,
    username: this.username,
    token: this.generateJWT(),
};
};

const User = mongoose.model('User', userSchema);

module.exports = User;