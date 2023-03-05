const express = require('express');
const { generateAPIResponse } = require('../common/Helper');
const { getLabelsOfCard, createLabelForCard, updateLabelOfCard, deleteLabelOfCard } = require('../controllers/Labels');

const router = express.Router();

router.get('/list/:cardId', async(req, res) => {
    try {
        const [status, response] = await getLabelsOfCard(req);
        res.status(status).json(response);
    } catch(error) {
        res.status(400).json(generateAPIResponse('Something went wrong'));
    }
});

router.post('/', async(req, res) => {
    try {
        const [status, response] = await createLabelForCard(req);
        res.status(status).json(response);
    } catch(error) {
        res.status(400).json(generateAPIResponse('Something went wrong'));
    }
})

router.put('/:labelId', async(req, res) => {
    try {
        const [status, response] = await updateLabelOfCard(req);
        res.status(status).json(response);
    } catch(error) {
        res.status(400).json(generateAPIResponse('Something went wrong'));
    }
});

router.delete('/:labelId', async(req, res) => {
    try {
        const [status, response] = await deleteLabelOfCard(req);
        res.status(status).json(response);
    } catch(error) {
        res.status(400).json(generateAPIResponse('Something went wrong'));
    }
})

module.exports = router;