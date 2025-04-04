import { User } from '../models/index.js';
import sendEmail from '../services/nodemailer.js';
import {
  generateOtp,
  generatePassword,
  generateToken,
  hashPassword,
} from '../utils/authUtilities.js';
import bcrypt from 'bcrypt';

// Register New User
const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phoneNumber } = req.body;

    if (!firstName || !email || !password || !phoneNumber) {
      return res.status(404).json({
        status: 'failed',
        message: 'Please add all fields',
      });
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(404).json({
        status: 'failed',
        message: 'User exists, check email id',
      });
    }

    //Hashing password
    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
    });

    return res.status(201).json({
      status: 'success',
      message: 'User created succesfully',
      userData: {
        id: user._id,
      },
    });
  } catch (error) {
    console.log(error.message);

    res.status(400).json({
      status: 'error',
      message: 'Something went wrong while creating user',
    });
  }
};

// Login User
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).json({
        status: 'failed',
        message: 'Please add all fields',
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: 'failed',
        message: 'User not found ,Please check email',
      });
    }

    const { _id, firstName, lastName, phoneNumber, role } = user;
    if (user && (await bcrypt.compare(password, user.password))) {
      return res.status(200).json({
        status: 'success',
        message: `Welcome back ${firstName} ${lastName}`,
        token: await generateToken(_id),
        user: {
          _id,
          firstName,
          lastName,
          email,
          phoneNumber,
          role,
        },
      });
    }
    return res.status(401).json({
      status: 'error',
      message: 'Invalid Credentials',
    });
  } catch (error) {
    console.log(error.message);

    res.status(400).json({
      status: 'error',
      message: 'Something went wrong while login',
    });
  }
};

//

const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber } = req.body;
    const id = req.user._id;
    const creatorId = id;
    if (!firstName || !email || !phoneNumber) {
      return res.status(404).json({
        status: 'failed',
        message: 'Please add all fields',
      });
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(404).json({
        status: 'failed',
        message: 'User exists, check email id',
      });
    }
    //genrating random password
    const password = await generatePassword();
    //hashed password
    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
      creatorId,
    });

    if (user) {
      sendEmail({
        to: email,
        subject: 'welcome to our platform',
        text: `Hello ${firstName} ${lastName}, Your account has been created successfully. Your password is ${password}`,
      });
      return res.status(201).json({
        status: 'success',
        message: 'User created succesfully',
        userData: {
          id: user._id,
          password: password,
        },
      });
    }

    return res.status(400).json({
      status: 'error',
      message: 'Something went wrong while creating user',
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      status: 'error',
      message: 'Something went wrong while creating user',
    });
  }
};

// Get all users - Admin
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      status: 'success',
      message: 'All users fetched successfully',
      data: users,
    });
  } catch (error) {
    console.log(error.message);

    res.status(400).json({
      status: 'error',
      message: 'Something went wrong while fetching users',
    });
  }
};

// Get all users - Admin
const getMyUsers = async (req, res) => {
  try {
    const userId = req.user._id;
    const users = await User.find({ creatorId: userId });

    res.status(200).json({
      status: 'success',
      message: 'All users fetched successfully',
      data: users,
    });
  } catch (error) {
    console.log(error.message);

    res.status(400).json({
      status: 'error',
      message: 'Something went wrong while fetching users',
    });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete({ _id: id });
    if (!user) {
      return res.status(404).json({
        status: 'failed',
        message: 'User not found',
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'User deleted successfully',
    });
  } catch (error) {
    console.log(error.message);

    res.status(400).json({
      status: 'error',
      message: 'Something went wrong while deleting user',
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ status: 'failed', message: 'user not found' });
    }

    const otp = await generateOtp();

    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otp;
    user.otpExpire = otpExpires;

    await user.save();

    await sendEmail({
      to: email,
      subject: 'Forgot Password ?',
      text: `Hello ${user.firstName} ${user.lastName}, Your OTP for password reset is ${otp}. It is valid for 10 Minutes.`,
    });

    return res.status(200).json({
      status: 'success',
      message: 'OTP Sent successfully, Please check your email.',
    });
  } catch (error) {
    console.log(error.message);

    res.status(400).json({
      status: 'error',
      message: 'Something went wrong while sending otp',
    });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user || user.otp !== otp || user.otpExpire < new Date()) {
      return res.status(400).json({
        status: 'failed',
        message: 'Invalid or expired otp',
      });
    }

    const tempPassword = await generatePassword();

    user.password = await hashPassword(tempPassword);
    user.otp = null;
    user.otpExpire = null;
    await user.save();

    await sendEmail({
      to: email,
      subject: 'Temporary password',
      text: `Hello ${user.firstName} ${user.lastName}, Your temporary password is ${tempPassword}. Please log in and reset your password immediately.`,
    });

    return res.status(200).json({
      status: 'success',
      message: 'Temporary Password sent to your email.',
    });
  } catch (error) {
    console.log(error.message);

    res.status(400).json({
      status: 'error',
      message: 'Something went wrong while verifying otp',
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;

    if (!email || !oldPassword || !newPassword) {
      return res.status(400).json({
        status: 'failed',
        message: 'Please provide email, old password, and new password',
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        status: 'failed',
        message: 'User not found',
      });
    }

    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        status: 'failed',
        message: 'Old password is incorrect',
      });
    }

    // Hash the new password
    const hashedPassword = await hashPassword(newPassword);

    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({
      status: 'success',
      message: 'Password updated successfully',
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong while resetting the password',
    });
  }
};

const updateMe = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({
        status: 'failed',
        message: 'user not found',
      });
    }
    await User.findOneAndUpdate({ _id: userId }, req.body, { new: true });
    return res.status(200).json({
      status: 'success',
      message: 'User Profile updated successfully',
    });
  } catch (error) {
    console.log(error.message);

    return res.status(400).json({
      status: 'error',
      message: 'Something went wrong while updating profile',
    });
  }
};

const updateUserDetails = async (req, res) => {
  try {
    const { userId } = req.params;
    const { firstName, lastName, phoneNumber } = req.body;

    console.log(userId);

    // Find and update the user
    const updatedUser = await User.findByIdAndUpdate(
      { _id: userId },
      { firstName, lastName, phoneNumber },
      { new: true, runValidators: true }
    );

    // If user is not found
    if (!updatedUser) {
      return res.status(404).json({
        status: 'failed',
        message: 'User not found',
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'User details updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error updating user:', error.message);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong while updating user details',
    });
  }
};

export const userController = {
  register,
  login,
  createUser,
  getAllUsers,
  getMyUsers,
  deleteUser,
  forgotPassword,
  verifyOtp,
  resetPassword,
  updateMe,
  updateUserDetails,
};
