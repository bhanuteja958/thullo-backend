import express from 'express';
import {generateAPIResponse} from '../common/helper.js';
import  { createListForBoard, updateListOfBoard, deleteListFromBoard } from '../controllers/Lists.js';

const listsRouter = express.Router();

listsRouter.post('/', async(req,res) => {
    try {
        const [status,response] = await createListForBoard(req);
        res.status(status).json(response);
    } catch(error) {
        console.log(error);
        res.status(500).json(generateAPIResponse('Something went wrong'));
    }
});

listsRouter.put('/:list_id', async(req, res) => {
    try{
        const [status, response] = await updateListOfBoard(req);
        res.status(status).json(response);
    } catch(error) {
        console.log(error);
        res.status(500).json(generateAPIResponse('Something went wrong'));
    }
});

listsRouter.delete('/:list_id', async(req, res) => {
    try{
        const [status, response] = await deleteListFromBoard(req);
        res.status(status).json(response);
    } catch(error) {
        console.log(error);
        res.status(500).json(generateAPIResponse('Something went wrong'));
    }
});

export default listsRouter;