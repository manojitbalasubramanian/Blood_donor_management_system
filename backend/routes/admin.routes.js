import express from 'express';
import { updateAdminStatus, getAllUsers } from '../controllers/admin.controller.js';

const router = express.Router();

// GET /api/admin/all - get all users
router.get('/all', getAllUsers);

// PATCH /api/admin/:userId - update admin status
router.patch('/:userId', updateAdminStatus);

export default router;
