const dotenv = require('dotenv');
dotenv.config()

const express = require('express');
const { FALLBACK_PORT } = require('./config/constants');
const { connectToDB } = require('./services/database');

const app = express();

connectToDB().then(() => {
    const PORT = process.env.PORT || FALLBACK_PORT;
    app.listen(PORT, () => {
        console.log(`Server listening at port ${PORT} `)
    });
});

