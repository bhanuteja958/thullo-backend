import express, { Request, Response } from 'express';
import {generateAPIResponse} from '../common/helper.js';
import  { registerUser, loginUser, sendVerificationEmail, verifyUserToken } from '../controllers/UserAuth.js';

const authRouter = express.Router();

authRouter.post('/register', async (req,res) => {
    try{
        const {status, response} = await registerUser(req);
        res.status(status).json(response);
    } catch(error) {
        res.status(500).json(generateAPIResponse('Something went wrong'));
    }
});

authRouter.post('/login', async (req:Request,res:Response) => {
    try{
        const {status, response} = await loginUser(req);
        res.status(status).json(response);
    } catch(error) {
        console.log(error);
        res.status(500).json(generateAPIResponse('Something went wrong'));
    }
});

authRouter.get('/verify/:token', async (req,res) => {
    try{
        const {status, response} = await verifyUserToken(req);
        res.status(status).json(response);
    } catch(error) {
        console.log(error);
        res.status(500).json(generateAPIResponse('Something went wrong'))
    }
})

authRouter.get('/sendVerificationEmail', async (req, res) => {
    try {
        const {status, response} = await sendVerificationEmail(req)
        res.status(status).json(response);
    } catch(error) {
        console.log(error);
        res.status(500).json(generateAPIResponse('Something went wrong'))
    }
});

export default authRouter;