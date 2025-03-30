import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const generateToken = async (id) => {
  const jwtSecret = process.env.JWT_SECRET;
  const token = jwt.sign({ id }, jwtSecret);
  return token;
};

export const randomTokenGeneration = async (id) => {
  const tokenData = await generateToken(id);
  const jwtSecret = process.env.JWT_SECRET;
  const token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
      data: tokenData,
    },
    jwtSecret
  );
  return token;
};

export const generatePassword = async () => {
  const password = Math.random().toString(36).slice(-8);
  return password;
};

export const generateOtp = async () => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  return otp;
};
