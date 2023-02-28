const express = require('express');
const { generateAPIResponse } = require('../common/helper');
const { createCardForAList, getCardDataOfList, updateCardOfList, deleteCardFromList, addMemberToCard, removeMemberFromCard } = require('../controllers/Cards');
const router = express.Router();

router.post('/', async(req, res) => {
    try {
        const [status, response] = await createCardForAList(req);
        res.status(status).json(response);
    } catch(error) {    
        console.log(error);
        res.status(500).json(generateAPIResponse('Something went wrong'));
    }
});

router.get('/:card_id', async(req, res) => {
    try {
        const [status, response] = await getCardDataOfList(req);
        res.status(status).json(response);
    } catch(error) {
        console.log(error);
        res.status(500).json(generateAPIResponse('Something went wrong'));
    }
});

router.put('/:card_id', async(req, res) => {
    try {
        const [status, response] = await updateCardOfList(req);
        res.status(status).json(response);
    } catch(error) {
        console.log(error);
        res.status(500).json(generateAPIResponse('Something went wrong'));
    }
});

router.delete('/:card_id', async(req, res) => {
    try {
        const [status, response] = await deleteCardFromList(req);
        res.status(status).json(response);
    } catch(error) {
        console.log(error);
        res.status(500).json(generateAPIResponse('Something went wrong'));
    }
});

router.post('/addMember', async(req,res) => {
    try {
        const [status, response] = await addMemberToCard(req);
        res.status(status).json(response);
    } catch(error) {
        console.log(error);
        res.status(500).json(generateAPIResponse('Something went wrong'));
    }
});

router.delete('/removeMember/:card_id/:user_id', async(req, res) => {
    try {
        const [status, response] = await removeMemberFromCard(req);
        res.status(status).json(response);
    } catch(error) {
        console.log(error);
        res.status(500).json(generateAPIResponse('Something went wrong'));
    }
})

module.exports = router;
