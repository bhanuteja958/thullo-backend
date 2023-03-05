const express = require('express');
const { generateAPIResponse } = require('../common/helper');
const { createCommentOnCard, getCommentsOfCard, updateCommentOfCard, deleteCommentOfCard } = require('../controllers/Comments');
const router = express.Router();

router.get('/list/:card_id', async (req, res) => {
    try {   
        const [status, response] = await getCommentsOfCard(req);
        res.status(status).json(response);
    } catch(error) {
        console.log(error);
        res.status(500).json(generateAPIResponse('Something went wrong'));
    }
});

router.post('/', async (req, res) => {
    try {
        const [status, response] = await createCommentOnCard(req);
        res.status(status).json(response);
    } catch(error) {
        console.log(error);
        res.status(500).json(generateAPIResponse('Something went wrong'));
    }
});

router.put('/:comment_id', async(req, res) => {
    try {
        const [status, response] = await updateCommentOfCard(req);
        res.status(status).json(response);
    } catch(error) {
        console.log(error);
        res.status(500).json(generateAPIResponse('Something went wrong'));
    }
});

router.delete('/:comment_id', async (req, res) => {
    try {
        const [status, response] = await deleteCommentOfCard(req)
        res.status(status).json(response);
    } catch(error) {
        console.log(error);
        res.status(500).json(generateAPIResponse('Something went wrong'));
    }
});

module.exports = router;