import express from 'express';
import {generateAPIResponse} from '../common/helper.js';
import { createUserBoard, getBoardsOfUser, getBoardData, updateBoardData, deleteBoardData, addMemberToBoard, removeMemberFromBoard } from '../controllers/Boards.js';

const boardsRouter = express.Router();

boardsRouter.get('/', async (req, res) => {
    try {
        const [status, response] = await getBoardsOfUser(req);
        res.status(status).json(response);
    } catch(error) {
        console.log(error);
        const response = generateAPIResponse('Something went wrong')
        res.status(500).json(response);
    }
})

boardsRouter.post('/',async (req,res) => {
    try{
        const [status, response] = await createUserBoard(req);
        res.status(status).json(response);
    } catch(error) {
        console.log(error);
        res.status(500).json(generateAPIResponse('Something went wrong'));
    }
});

boardsRouter.get('/:boardId', async (req,res) => {
    try {
        const [status, response] = await getBoardData(req);
        res.status(status).json(response);
    } catch(error) {
        console.log(error);
        res.status(500).json(generateAPIResponse('Something went wrong'));
    }
});

boardsRouter.put('/:boardId', async (req, res) => {
    try {
        const [status, response] = await updateBoardData(req);
        res.status(status).json(response);
    } catch(error) {
        console.log(error);
        res.status(500).json(generateAPIResponse('Something went wrong'));
    }
})

boardsRouter.delete('/:boardId', async (req, res) => {
    try {
        const [status, response] = await deleteBoardData(req);
        res.status(status).json(response);
    } catch(error) {
        console.log(error);
        res.status(500).json(generateAPIResponse('Something went wrong'));
    }
})

boardsRouter.post('/addMember', async(req, res) => {
    try{
        const [status, response] = await addMemberToBoard(req);
        res.status(status).json(response);
    } catch(error) {
        console.log(error);
        res.status(500).json(generateAPIResponse('Something went wrong'));
    }
});

boardsRouter.delete('/removeMember/:board_id/:user_id', async(req, res) => {
    try{
        const [status, response] = await removeMemberFromBoard(req);
        res.status(status).json(response);
    } catch(error) {
        console.log(error);
        res.status(500).json(generateAPIResponse('Something went wrong'));
    }
})



export default boardsRouter;