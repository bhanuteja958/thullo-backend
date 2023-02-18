const dotenv = require('dotenv');
dotenv.config()

const express = require('express');
const { FALLBACK_PORT } = require('./common/constants');
const authRouter = require('./routes/UserAuth');
const boardsRouter = require('./routes/Boards');
const { connectToDB } = require('./services/database');

const app = express();

//Middlewares for parsing incoming json or formdata request bodies
app.use(express.json());

app.use('/api/user', authRouter);

app.use('/api/board', boardsRouter);

connectToDB().then(() => {
    const PORT = process.env.PORT || FALLBACK_PORT;
    app.listen(PORT, () => {
        console.log(`Server listening at port ${PORT} `)
    });
});

