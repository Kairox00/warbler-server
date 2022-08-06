const mongoose = require('mongoose')
mongoose.set('debug', true)
// mongoose.Promise = Promise 
mongoose.connect("mongodb+srv://server:8mileshit@warbler.jvullao.mongodb.net/WarblerDB?retryWrites=true&w=majority",{
    keepAlive: true
});


module.exports.User = require('./user')
module.exports.Message = require("./message")
