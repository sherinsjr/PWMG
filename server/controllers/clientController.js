import bcrypt from 'bcryptjs';
import sendEmail from '../services/nodemailer.js';
import {
  generatePassword,
  generateToken,
  hashPassword,
} from '../utils/authUtilities.js';
import { Client } from '../models/index.js';

// Register client (self-registration)
const registerClient = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      age,
      gender,
      weight,
      height,
    } = req.body;

    const existingClient = await Client.findOne({ email });
    if (existingClient) {
      return res.status(400).json({ message: 'Client already exists' });
    }

    const client = await Client.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      age,
      gender,
      weight,
      height,
    });

    return res.status(201).json({
      status: 'success',
      message: 'Registration successful. Awaiting verification.',
      client,
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: 'Something went wrong while Registering',
    });
  }
};

// Admin creates a client
const createClientByAdmin = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      age,
      gender,
      weight,
      height,
      goals,
      personalTrainer,
      prefferedWorkoutPlan,
      feeDetails,
    } = req.body;

    const existingClient = await Client.findOne({ email });
    if (existingClient) {
      return res.status(400).json({ message: 'Client already exists' });
    }
    //genrating random password
    const password = await generatePassword();

    //Hashing password
    const hashedPassword = await hashPassword(password);

    const newClient = await Client.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
      age,
      gender,
      weight,
      height,
      goals,
      personalTrainer,
      prefferedWorkoutPlan,
      feeDetails,
      isVerified: true,
    });

    // Send login credentials via email
    if (newClient) {
      sendEmail({
        to: email,
        subject: 'Welcome to the PW_GYP App',
        text: `Hello ${firstName} ${lastName}, Your account has been created successfully. Your password is ${password}`,
      });
      return res.status(201).json({
        status: 'success',
        message: 'Client created and credentials sent via email',
        newClient,
      });
    }

    return res.status(400).json({
      status: 'error',
      message: 'Something went wrong while creating client',
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to create client', error: error.message });
  }
};

// Client login
const loginClient = async (req, res) => {
  try {
    const { email, password } = req.body;

    const client = await Client.findOne({ email });
    if (!client) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    if (!client.isVerified) {
      return res.status(403).json({ message: 'Client not verified yet' });
    }

    if (client && (await bcrypt.compare(password, client.password))) {
      return res.status(200).json({
        status: 'success',
        message: `Welcome back ${client.firstName} ${client.lastName}`,
        token: await generateToken(client._id),
        client,
      });
    }

    return res.status(401).json({
      status: 'error',
      message: 'Invalid Credentials',
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to login', error: error.message });
  }
};

// Admin verifies a client
const verifyClient = async (req, res) => {
  try {
    const { clientId } = req.params;
    const client = await Client.findById(clientId);

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    // Generate random password
    const password = await generatePassword();

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Update client details
    client.password = hashedPassword;
    client.isVerified = true;
    await client.save();

    sendEmail({
      to: client.email,
      subject: 'Your Account Verified',
      text: `Hello ${client.firstName} ${client.lastName}, Your account has been verified successfully. Your password is ${password}`,
    });
    return res.status(200).json({
      status: 'success',
      message: 'Client verified successfully',
      client,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to verify client', error: error.message });
  }
};

// Get all clients (Admin)
const getAllClients = async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
    res.status(200).json({ clients });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to fetch clients', error: error.message });
  }
};

// Get single client by ID
const getClientById = async (req, res) => {
  try {
    const { clientId } = req.params;
    const client = await Client.findById(clientId);
    if (!client) return res.status(404).json({ message: 'Client not found' });
    res.status(200).json({ client });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to get client', error: error.message });
  }
};

// Update client profile
const updateClient = async (req, res) => {
  try {
    const { clientId } = req.params;
    const updateData = req.body;

    const client = await Client.findByIdAndUpdate(clientId, updateData, {
      new: true,
    });
    if (!client) return res.status(404).json({ message: 'Client not found' });

    res.status(200).json({ message: 'Client updated', client });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to update client', error: error.message });
  }
};

// Delete client
const deleteClient = async (req, res) => {
  try {
    const { clientId } = req.params;

    const client = await Client.findByIdAndDelete(clientId);
    if (!client) return res.status(404).json({ message: 'Client not found' });

    res.status(200).json({ message: 'Client deleted successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to delete client', error: error.message });
  }
};

const addFeeToClient = async (req, res) => {
  try {
    const { clientId } = req.params;
    const { planName, planAmount, paymentStatus, paymentDate } = req.body;

    const client = await Client.findById(clientId);
    if (!client) return res.status(404).json({ message: 'Client not found' });

    client.feeDetails.push({
      planName,
      planAmount,
      paymentStatus,
      paymentDate,
    });

    await client.save();

    res.status(200).json({
      message: 'Fee record added successfully',
      feeDetails: client.feeDetails,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to add fee', error: error.message });
  }
};

const updateClientFee = async (req, res) => {
  try {
    const { clientId } = req.params;
    const { paymentRecievedDate } = req.body;

    const client = await Client.findById(clientId);
    if (!client) return res.status(404).json({ message: 'Client not found' });

    if (!client.feeDetails || client.feeDetails.length === 0) {
      return res.status(400).json({ message: 'No fee record to update' });
    }

    const receivedDate = new Date(paymentRecievedDate);
    const nextDueDate = new Date(receivedDate);
    nextDueDate.setMonth(receivedDate.getMonth() + 1);

    // Update the most recent/only fee record
    const latestFee = client.feeDetails[0];
    latestFee.paymentStatus = 'Paid';
    latestFee.paymentRecievedDate = receivedDate;
    latestFee.paymentDueDate = nextDueDate;

    await client.save();

    res.status(200).json({
      message: 'Fee record updated successfully',
      feeDetails: latestFee,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to update fee', error: error.message });
  }
};

const getClientFees = async (req, res) => {
  try {
    const { clientId } = req.params;

    const client = await Client.findById(clientId);
    if (!client) return res.status(404).json({ message: 'Client not found' });

    res.status(200).json({
      message: 'Fee details fetched successfully',
      feeDetails: client.feeDetails,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to get fee details', error: error.message });
  }
};

const assignPersonalTrainer = async (req, res) => {
  try {
    const { clientId } = req.params;
    const { trainerId } = req.body;

    const client = await Client.findById(clientId);
    if (!client) return res.status(404).json({ message: 'Client not found' });

    client.personalTrainer = trainerId;
    await client.save();

    res.status(200).json({
      message: 'Personal trainer assigned successfully',
      client,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to assign personal trainer',
      error: error.message,
    });
  }
};

const removePersonalTrainer = async (req, res) => {
  try {
    const { clientId } = req.params;

    const client = await Client.findById(clientId);
    if (!client) return res.status(404).json({ message: 'Client not found' });

    client.personalTrainer = null;
    await client.save();

    res.status(200).json({
      message: 'Personal trainer removed successfully',
      client,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to remove personal trainer',
      error: error.message,
    });
  }
};

const setPreferredWorkoutPlan = async (req, res) => {
  try {
    const { clientId } = req.params;
    const { workoutPlanId } = req.body;

    const client = await Client.findById(clientId);
    if (!client) return res.status(404).json({ message: 'Client not found' });

    client.prefferedWorkoutPlan = workoutPlanId;
    await client.save();

    res.status(200).json({
      message: 'Preferred workout plan set successfully',
      client,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to set preferred workout plan',
      error: error.message,
    });
  }
};

const removePreferredWorkoutPlan = async (req, res) => {
  try {
    const { clientId } = req.params;

    const client = await Client.findById(clientId);
    if (!client) return res.status(404).json({ message: 'Client not found' });

    client.prefferedWorkoutPlan = null;
    await client.save();

    res.status(200).json({
      message: 'Preferred workout plan removed successfully',
      client,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to remove preferred workout plan',
      error: error.message,
    });
  }
};

export const clientController = {
  registerClient,
  createClientByAdmin,
  loginClient,
  verifyClient,
  getAllClients,
  getClientById,
  updateClient,
  deleteClient,
  addFeeToClient,
  updateClientFee,
  getClientFees,
  assignPersonalTrainer,
  removePersonalTrainer,
  setPreferredWorkoutPlan,
  removePreferredWorkoutPlan,
};
