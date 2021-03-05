import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
const router = express.Router();
import {
  authUser,
  registerUser,
  updateUserProfile,
  getUserProfile,
} from '../controllers/userController.js';

router.post('/', registerUser);
router.post('/login', authUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
