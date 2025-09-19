import express from 'express';
import { updateAdminStatus, getAllUsers, getStatistics } from '../controllers/admin.controller.js';

const router = express.Router();

// GET /api/admin/statistics - get statistics for home page
router.get('/statistics', getStatistics);

// GET /api/admin/all - get all users
router.get('/all', getAllUsers);

// PATCH /api/admin/:userId - update admin status
router.patch('/:userId', updateAdminStatus);

export default router;
