const express = require('express');
const { generateAPIResponse } = require('../common/Helper');
const { createAttachmentForCard, updateAttachmentOfCard, getAttachmentsOfCard, deleteAttachmentOfCard } = require('../controllers/Attachments');

const router = express.Router();

router.get('/list/:cardId', async(req, res) => {
    try {
        const [status, response] = await getAttachmentsOfCard(req);
        res.status(status).json(response);
    } catch(error) {
        res.status(400).json(generateAPIResponse('Something went wrong'));
    }
});

router.post('/', async(req, res) => {
    try {
        const [status, response] = await createAttachmentForCard(req);
        res.status(status).json(response);
    } catch(error) {
        res.status(400).json(generateAPIResponse('Something went wrong'));
    }
})

router.put('/:attachmentId', async(req, res) => {
    try {
        const [status, response] = await updateAttachmentOfCard(req);
        res.status(status).json(response);
    } catch(error) {
        res.status(400).json(generateAPIResponse('Something went wrong'));
    }
});

router.delete('/:attachmentId', async(req, res) => {
    try {
        const [status, response] = await deleteAttachmentOfCard(req);
        res.status(status).json(response);
    } catch(error) {
        res.status(400).json(generateAPIResponse('Something went wrong'));
    }
})

module.exports = router;