import express from 'express';
import { userController } from '../controllers/index.js';

const userRoutes = express.Router();

import authenticate from '../middlewares/authMiddleware.js';

userRoutes.route('/register').post(userController.register);
userRoutes.route('/login').post(userController.login);
userRoutes.route('/create').post(authenticate.user, userController.createUser);
userRoutes.route('/all').get(userController.getAllUsers);
userRoutes.route('/myUsers').get(authenticate.user, userController.getMyUsers);
userRoutes
  .route('/delete/:id')
  .delete(authenticate.user, userController.deleteUser);
userRoutes.route('/forgot').post(userController.forgotPassword);
userRoutes.route('/verify').post(userController.verifyOtp);
userRoutes.route('/reset').post(userController.resetPassword);
userRoutes.route('/update/me').put(authenticate.user, userController.updateMe);
userRoutes
  .route('/update/:userId')
  .put(authenticate.user, userController.updateUserDetails);

export default userRoutes;
