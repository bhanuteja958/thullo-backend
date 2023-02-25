const dotenv = require('dotenv');
dotenv.config()

const express = require('express');
const { FALLBACK_PORT } = require('./common/constants');
const authRouter = require('./routes/UserAuth');
const boardsRouter = require('./routes/Boards');
const listsRouter = require('./routes/Lists');
const { connectToDB } = require('./services/database');
const { accessTokenVerification } = require('./middlewares');

const app = express();

//Middlewares for parsing incoming json
app.use(express.json());
app.use(accessTokenVerification);

app.use('/api/user', authRouter);

app.use('/api/board', boardsRouter);

app.use('/api/list', listsRouter);

connectToDB().then(() => {
    const PORT = process.env.PORT || FALLBACK_PORT;
    app.listen(PORT, () => {
        console.log(`Server listening at port ${PORT} `)
    });
});

