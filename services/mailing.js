const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: false,
    auth: {
        user: process.env.GMAIL_TRANSPORT_EMAIL,
        pass: process.env.GMAIL_APP_PASSWORD
    }
});

const sendVerifyEmail = async (token, email) => {
    try{
        const verficationLink = `http://localhost:5000/verify/${token}`
        html = `
            <h2>Verify your email</h2>
            <a href=${verficationLink} target="_blank">${verficationLink}</a>
        `

        const sendEmailResult = await transporter.sendMail({
            from: 'testbhanuteja@gmail.com',
            to: 'banu.teja958@gmail.com',
            subject: 'Email Verification',
            html
        });

        return sendEmailResult
    } catch (error) {
        console.log('Error while sending email:', error);
        return {
            errorMessage: error.message,
            status: 400
        }
    }   
}

module.exports = {
    sendVerifyEmail
}