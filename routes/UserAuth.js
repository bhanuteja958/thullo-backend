const express = require('express');
const { generateAPIResponse } = require('../common/helper');
const { registerUser, loginUser, sendVerificationEmail } = require('../controllers/UserAuth');
const router = express.Router();

router.post('/register', async (req,res) => {
    try{
        const [status, response] = await registerUser(req.body);
        res.status(status).json(response);
    } catch(error) {
        res.status(500).json(generateAPIResponse('Something went wrong'));
    }
})

router.post('/login', async (req,res) => {
    try{
        const [status, response] = await loginUser(req.body);
        res.status(status).json(response);
    } catch(error) {
        console.log(error);
        res.status(500).json(generateAPIResponse('Something went wrong'));
    }
})

router.get('/sendVerificationEmail', async (req, res) => {
    try {
        const [status, response] = await sendVerificationEmail(req.headers.authorization)
        res.status(status).json(response);
    } catch(error) {
        console.log(error);
        res.status(500).json(generateAPIResponse('Something went wrong'))
    }
})

module.exports = router;