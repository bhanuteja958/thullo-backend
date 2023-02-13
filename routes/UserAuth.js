const express = require('express');
const { generateAPIResponse } = require('../common/helper');
const { registerUser } = require('../controllers/UserAuth');
const router = express.Router();

router.post('/register', async (req,res) => {
    try{
        const [status, response] = await registerUser(req.body);
        res.status(status).json(response);
    } catch(error) {
        res.status(500).json(generateAPIResponse('Something went wrong'));
    }
})

module.exports = router;