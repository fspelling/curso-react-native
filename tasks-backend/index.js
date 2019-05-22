const express = require('express')
const app = express();
const consign = require('consign');
const db = require('./config/db.js');

consign()
    .then('./config/middlewares.js')
    .into(app);

app.db = db;

app.listen(3000, () => {
    console.log('rodando');
});