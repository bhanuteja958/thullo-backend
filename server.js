const dotenv = require('dotenv');
dotenv.config()

const express = require('express');
const { FALLBACK_PORT } = require('./common/constants');
const authRouter = require('./routes/UserAuth');
const boardsRouter = require('./routes/Boards');
const listsRouter = require('./routes/Lists');
const cardsRouter = require('./routes/Cards');
const commentsRouter = require('./routes/Comments');
const attachmentsRouter = require('./routes/Attachments');
const labelsRouter = require('./routes/Labels');
const { connectToDB } = require('./services/database');
const { accessTokenVerification, checkPayloadSchema } = require('./middlewares');

const app = express();

//Middlewares for parsing incoming json
app.use(express.json());
app.use(accessTokenVerification);
app.use(checkPayloadSchema);

app.use('/api/user', authRouter);

app.use('/api/board', boardsRouter);

app.use('/api/list', listsRouter);

app.use('/api/card', cardsRouter);

app.use('/api/comment', commentsRouter);

app.use('/api/attachment', attachmentsRouter);

app.use('/api/label', labelsRouter);

connectToDB().then(() => {
    const PORT = process.env.PORT || FALLBACK_PORT;
    app.listen(PORT, () => {
        console.log(`Server listening at port ${PORT}`);
    });
});

