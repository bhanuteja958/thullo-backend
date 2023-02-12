const dotenv = require('dotenv');
const { urlencoded } = require('express');
dotenv.config()

const express = require('express');
const { FALLBACK_PORT } = require('./common/constants');
const authRouter = require('./routes/UserAuth');
const { connectToDB } = require('./services/database');

const app = express();

//Middlewares for parsing incoming json or formdata request bodies
app.use(express.json());

app.use('/api/user', authRouter);

connectToDB().then(() => {
    const PORT = process.env.PORT || FALLBACK_PORT;
    app.listen(PORT, () => {
        console.log(`Server listening at port ${PORT} `)
    });
});

