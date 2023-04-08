import express from 'express';
import {generateAPIResponse} from '../common/helper.js';
import { createCommentOnCard, getCommentsOfCard, updateCommentOfCard, deleteCommentOfCard } from '../controllers/Comments.js';

const commentsRouter = express.Router();

commentsRouter.get('/list/:card_id', async (req, res) => {
    try {   
        const [status, response] = await getCommentsOfCard(req);
        res.status(status).json(response);
    } catch(error) {
        console.log(error);
        res.status(500).json(generateAPIResponse('Something went wrong'));
    }
});

commentsRouter.post('/', async (req, res) => {
    try {
        const [status, response] = await createCommentOnCard(req);
        res.status(status).json(response);
    } catch(error) {
        console.log(error);
        res.status(500).json(generateAPIResponse('Something went wrong'));
    }
});

commentsRouter.put('/:comment_id', async(req, res) => {
    try {
        const [status, response] = await updateCommentOfCard(req);
        res.status(status).json(response);
    } catch(error) {
        console.log(error);
        res.status(500).json(generateAPIResponse('Something went wrong'));
    }
});

commentsRouter.delete('/:comment_id', async (req, res) => {
    try {
        const [status, response] = await deleteCommentOfCard(req)
        res.status(status).json(response);
    } catch(error) {
        console.log(error);
        res.status(500).json(generateAPIResponse('Something went wrong'));
    }
});

export default commentsRouter;