const express = require("express");
const app = express();
const route = require('./routes/route')

require('dotenv').config();
const {PORT} = process.env;

const {connectDB} = require('./conn/db');

app.use(express.json());
app.use(express.urlencoded({extended : true}));

connectDB();

app.use('/', route);

app.listen(PORT , () => {
    console.log(`express app running on port ${PORT}`)
})