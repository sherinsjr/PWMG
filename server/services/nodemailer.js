import transporter from './transporter.js';

const sendEmail = async (emailOptions) => {
  try {
    const emailDetails = await transporter.sendMail({
      from: process.env.USER_EMAIL,
      ...emailOptions,
    });
    return emailDetails;
  } catch (error) {
    console.error('Error while sending email:', error);
    throw error;
  }
};

export default sendEmail;
