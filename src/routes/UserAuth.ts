import express from 'express';
import {generateAPIResponse} from '../common/helper.js';
import  { registerUser, loginUser, sendVerificationEmail, verifyUserToken } from '../controllers/UserAuth.js';

const authRouter = express.Router();

authRouter.post('/register', async (req,res) => {
    try{
        const [status, response] = await registerUser(req.body);
        res.status(status).json(response);
    } catch(error) {
        res.status(500).json(generateAPIResponse('Something went wrong'));
    }
});

authRouter.post('/login', async (req,res) => {
    try{
        const [status, response] = await loginUser(req.body);
        res.status(status).json(response);
    } catch(error) {
        console.log(error);
        res.status(500).json(generateAPIResponse('Something went wrong'));
    }
});

authRouter.get('/verify/:token', async (req,res) => {
    try{
        const [status, response] = await verifyUserToken(req.params.token);
        res.status(status).json(response);
    } catch(error) {
        console.log(error);
        res.status(500).json(generateAPIResponse('Something went wrong'))
    }
})

authRouter.get('/sendVerificationEmail', async (req, res) => {
    try {
        const [status, response] = await sendVerificationEmail(req)
        res.status(status).json(response);
    } catch(error) {
        console.log(error);
        res.status(500).json(generateAPIResponse('Something went wrong'))
    }
});

export default authRouter;