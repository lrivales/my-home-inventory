const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(bodyParser.json({limit: '16mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '16mb', extended: true}))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/pizza-hunt', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.listen(PORT, () => {
    console.log('Server started.')
});