import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const mail_transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
})

console.log('✅ Mail transporter configurado');

export default mail_transporter