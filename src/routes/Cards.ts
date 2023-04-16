import express, { Request, Response } from 'express';
import {generateAPIResponse} from '../common/helper.js';
import { createCardForAList, getCardDataOfList, updateCardOfList, deleteCardFromList, addMemberToCard, removeMemberFromCard } from '../controllers/Cards.js';

const cardsRouter = express.Router();

cardsRouter.post('/', async(req:Request, res:Response) => {
    try {
        const {status, response} = await createCardForAList(req);
        res.status(status).json(response);
    } catch(error) {    
        res.status(500).json(generateAPIResponse('Something went wrong'));
    }
});

cardsRouter.get('/:card_id', async(req:Request, res:Response) => {
    try {
        const {status, response}= await getCardDataOfList(req);
        res.status(status).json(response);
    } catch(error) {
        res.status(500).json(generateAPIResponse('Something went wrong'));
    }
});

cardsRouter.put('/:card_id', async(req:Request, res:Response) => {
    try {
        const {status, response} = await updateCardOfList(req);
        res.status(status).json(response);
    } catch(error) {
        res.status(500).json(generateAPIResponse('Something went wrong'));
    }
});

cardsRouter.delete('/:card_id', async(req:Request, res:Response) => {
    try {
        const {status, response} = await deleteCardFromList(req);
        res.status(status).json(response);
    } catch(error) {
        res.status(500).json(generateAPIResponse('Something went wrong'));
    }
});

cardsRouter.post('/addMember', async(req:Request, res:Response) => {
    try {
        const {status, response} = await addMemberToCard(req);
        res.status(status).json(response);
    } catch(error) {
        res.status(500).json(generateAPIResponse('Something went wrong'));
    }
});

cardsRouter.delete('/removeMember/:card_id/:user_id', async(req:Request, res:Response) => {
    try {
        const {status, response} = await removeMemberFromCard(req);
        res.status(status).json(response);
    } catch(error) {
        res.status(500).json(generateAPIResponse('Something went wrong'));
    }
})

export default cardsRouter;
