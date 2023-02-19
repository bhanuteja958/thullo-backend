const express = require('express');
const { generateAPIResponse } = require('../common/helper');
const { createUserBoard, getBoardsOfUser, getBoardData, updateBoardData, deleteBoardData } = require('../controllers/Boards');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const [status, response] = await getBoardsOfUser(req);
        res.status(status).json(response);
    } catch(error) {
        console.log(error);
        res.status(500).json(generateAPIResponse('Something went wrong'));
    }
})

router.post('/',async (req,res) => {
    try{
        const [status, response] = await createUserBoard(req);
        res.status(status).json(response);
    } catch(error) {
        console.log(error);
        res.status(500).json(generateAPIResponse('Something went wrong'));
    }
});

router.get('/:boardId', async (req,res) => {
    try {
        const [status, response] = await getBoardData(req);
        res.status(status).json(response);
    } catch(error) {
        console.log(error);
        res.status(500).json(generateAPIResponse('Something went wrong'));
    }
});

router.put('/:boardId', async (req, res) => {
    try {
        const [status, response] = await updateBoardData(req);
        res.status(status).json(response);
    } catch(error) {
        console.log(error);
        res.status(500).json(generateAPIResponse('Something went wrong'));
    }
})

router.delete('/:boardId', async (req, res) => {
    try {
        const [status, response] = await deleteBoardData(req);
        res.status(status).json(response);
    } catch(error) {
        console.log(error);
        res.status(500).json(generateAPIResponse('Something went wrong'));
    }
})



module.exports = router;