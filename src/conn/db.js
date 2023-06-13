const mongoose = require('mongoose');

require('dotenv').config();
const {MONGO_URL} = process.env;


const connectDB = async function () {
    
    await mongoose.connect(MONGO_URL,{
        useNewUrlParser : true
    })

    console.log('mongodb connected')
}

module.exports.connectDB = connectDB;
