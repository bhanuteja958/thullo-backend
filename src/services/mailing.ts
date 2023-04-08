import  nodemailer from 'nodemailer'
import { generateServiceResponse } from '../common/helper.js';


export const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: false,
    auth: {
        user: process.env.GMAIL_TRANSPORT_EMAIL,
        pass: process.env.GMAIL_APP_PASSWORD
    }
});


export const sendVerifyEmail = async (token:string, email:string) => {
    try{
        const verficationLink = `http://localhost:5000/verify/${token}`
        const html = `
            <div style="text-align:center; padding :2rem; background-color: #F8F9FD;box-sizing:border-box">
                <h1 style="margin:0; padding:0;box-sizing: border-box; margin-bottom:1rem">Thullo</h1>
                <h2 style="margin:0; padding:0;box-sizing: border-box; margin-bottom:1rem">Verify your email for loggining into Thullo</h2>
                <a href=${verficationLink} target="_blank" style="background-color:#2F80ED;text-decoration:none;color: white;font-weight:bold;padding:0.5rem;border-radius:0.2rem">Verfiy Email</a>
            </div>
        `

        const sendEmailResult = await transporter.sendMail({
            from: 'testbhanuteja@gmail.com',
            to: 'banu.teja958@gmail.com',
            subject: 'Email Verification',
            html
        });

        return generateServiceResponse(
            sendEmailResult ? 200: 500 ,
            false,
            sendEmailResult ? "Successfully sent verification email" : "Something went wrong while sending email",
        )
    } catch (error) {
        return generateServiceResponse(
            500,
            true,
            error.message
        )
    }   
}