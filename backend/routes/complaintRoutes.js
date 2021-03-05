import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import {
  getComplaints,
  getComplaintById,
  updateComplaint,
  createComment,
  getMyComplaints,
  createComplaint,
  deleteComplaint,
} from '../controllers/complaintController.js';
const router = express.Router();

router.route('/').get(getComplaints).post(protect, createComplaint);
router.route('/mycomplaints').get(protect, getMyComplaints);
router
  .route('/:id')
  .get(getComplaintById)
  .delete(protect, admin, deleteComplaint)
  .put(protect, admin, updateComplaint);
router.route('/:id/comment').post(protect, createComment);

export default router;
