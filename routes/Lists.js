const express = require('express');
const { generateAPIResponse } = require('../common/helper');
const { createListForBoard, updateListOfBoard, deleteListFromBoard } = require('../controllers/Lists');
const router = express.Router();

router.post('/', async(req,res) => {
    try {
        const [status,response] = await createListForBoard(req);
        res.status(status).json(response);
    } catch(error) {
        console.log(error);
        res.status(500).json(generateAPIResponse('Something went wrong'));
    }
});

router.put('/:list_id', async(req, res) => {
    try{
        const [status, response] = await updateListOfBoard(req);
        res.status(status).json(response);
    } catch(error) {
        console.log(error);
        res.status(500).json(generateAPIResponse('Something went wrong'));
    }
});

router.delete('/:list_id', async(req, res) => {
    try{
        const [status, response] = await deleteListFromBoard(req);
        res.status(status).json(response);
    } catch(error) {
        console.log(error);
        res.status(500).json(generateAPIResponse('Something went wrong'));
    }
});

module.exports = router;