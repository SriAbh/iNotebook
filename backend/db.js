const mongoose = require('mongoose');

const mongoURI = "mongodb://127.0.0.1:27017/iNotebook";

const connectToMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log('Mongo connected successfully');
    })
}

module.exports = connectToMongo;