import './loadenv.js';
import express, {Express} from 'express';
import {FALLBACK_PORT} from './common/constants.js';
import authRouter from './routes/UserAuth.js'
import boardsRouter from './routes/Boards.js';
import listsRouter from './routes/Lists.js';
import cardsRouter from './routes/Cards.js';
import commentsRouter from './routes/Comments.js';
import attachmentsRouter from './routes/Attachments.js';
import labelsRouter from './routes/Labels.js';
const  { connectToDB } =  await import ( './services/database.js')
import { accessTokenVerification, checkPayloadSchema } from './middlewares.js';

const app:Express = express();

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

