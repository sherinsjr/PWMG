import nodemailer from 'nodemailer';

const { HOST, SERVICE, MAIL_PORT, USER_EMAIL, USER_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
  service: SERVICE,
  host: HOST,
  port: MAIL_PORT,
  auth: {
    user: USER_EMAIL,
    pass: USER_PASSWORD,
  },
});

export default transporter;
