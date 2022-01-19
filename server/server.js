const express = require('express');
const bodyParser = require('body-parser'); // required for mongo-image-converter

const db = require('./config/connection');
const PORT = process.env.PORT || 3001;

const app = express();

app.use(bodyParser.json({limit: '16mb', extended: true})); // required for mongo-image-converter
app.use(bodyParser.urlencoded({limit: '16mb', extended: true})) // required for mongo-image-converter
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
});