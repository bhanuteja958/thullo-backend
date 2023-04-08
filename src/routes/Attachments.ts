import express from 'express';
import {generateAPIResponse} from '../common/helper.js';
import { createAttachmentForCard, updateAttachmentOfCard, getAttachmentsOfCard, deleteAttachmentOfCard } from '../controllers/Attachments.js';

const attachmentsRouter = express.Router();

attachmentsRouter.get('/list/:cardId', async(req, res) => {
    try {
        const [status, response] = await getAttachmentsOfCard(req);
        res.status(status).json(response);
    } catch(error) {
        res.status(400).json(generateAPIResponse('Something went wrong'));
    }
});

attachmentsRouter.post('/', async(req, res) => {
    try {
        const [status, response] = await createAttachmentForCard(req);
        res.status(status).json(response);
    } catch(error) {
        res.status(400).json(generateAPIResponse('Something went wrong'));
    }
})

attachmentsRouter.put('/:attachmentId', async(req, res) => {
    try {
        const [status, response] = await updateAttachmentOfCard(req);
        res.status(status).json(response);
    } catch(error) {
        res.status(400).json(generateAPIResponse('Something went wrong'));
    }
});

attachmentsRouter.delete('/:attachmentId', async(req, res) => {
    try {
        const [status, response] = await deleteAttachmentOfCard(req);
        res.status(status).json(response);
    } catch(error) {
        res.status(400).json(generateAPIResponse('Something went wrong'));
    }
})

export default attachmentsRouter;