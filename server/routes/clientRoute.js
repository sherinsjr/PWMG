import express from 'express';
import { clientController } from '../controllers/index.js';
import authenticate from '../middlewares/authMiddleware.js';

const clientRoute = express.Router();

// Public routes
clientRoute.route('/register').post(clientController.registerClient);
clientRoute.route('/login').post(clientController.loginClient);

// Admin only
clientRoute
  .route('/create')
  .post(authenticate.user, clientController.createClientByAdmin);
clientRoute
  .route('/verify/:clientId')
  .put(authenticate.user, clientController.verifyClient);
clientRoute
  .route('/all')
  .get(authenticate.user, clientController.getAllClients);
clientRoute
  .route('/get/:clientId')
  .get(authenticate.user, clientController.getClientById);
clientRoute
  .route('/delete/:clientId')
  .delete(authenticate.user, clientController.deleteClient);
clientRoute
  .route('/update/:clientId')
  .put(authenticate.user, clientController.updateClient);

// Fee management
clientRoute
  .route('/fees/:clientId')
  .get(authenticate.user, clientController.getClientFees);
clientRoute
  .route('/fees/:clientId/add')
  .post(authenticate.user, clientController.addFeeToClient);
clientRoute
  .route('/fees/:clientId/update')
  .put(authenticate.user, clientController.updateClientFee);

// Trainer assignment
clientRoute
  .route('/trainer/:clientId/assign')
  .put(authenticate.user, clientController.assignPersonalTrainer);
clientRoute
  .route('/trainer/:clientId/remove')
  .put(authenticate.user, clientController.removePersonalTrainer);

// Preferred workout plan
clientRoute
  .route('/workout/:clientId/set')
  .put(authenticate.user, clientController.setPreferredWorkoutPlan);
clientRoute
  .route('/workout/:clientId/remove')
  .put(authenticate.user, clientController.removePreferredWorkoutPlan);

export default clientRoute;
