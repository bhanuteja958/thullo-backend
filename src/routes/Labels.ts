import express, { Request, Response } from 'express';
import {generateAPIResponse} from '../common/helper.js';
import  {getLabelsOfCard, createLabelForCard, updateLabelOfCard, deleteLabelOfCard} from  '../controllers/Labels.js';

const labelsRouter = express.Router();

labelsRouter.get('/list/:cardId', async(req:Request, res:Response) => {
    try {
        const {status, response} = await getLabelsOfCard(req);
        res.status(status).json(response);
    } catch(error) {
        res.status(400).json(generateAPIResponse('Something went wrong'));
    }
});

labelsRouter.post('/', async(req:Request, res:Response) => {
    try {
        const {status, response} = await createLabelForCard(req);
        res.status(status).json(response);
    } catch(error) {
        res.status(400).json(generateAPIResponse('Something went wrong'));
    }
})

labelsRouter.put('/:labelId', async(req:Request, res:Response) => {
    try {
        const {status, response} = await updateLabelOfCard(req);
        res.status(status).json(response);
    } catch(error) {
        res.status(400).json(generateAPIResponse('Something went wrong'));
    }
});

labelsRouter.delete('/:labelId', async(req:Request, res:Response) => {
    try {
        const {status, response} = await deleteLabelOfCard(req);
        res.status(status).json(response);
    } catch(error) {
        res.status(400).json(generateAPIResponse('Something went wrong'));
    }
})

export default labelsRouter;