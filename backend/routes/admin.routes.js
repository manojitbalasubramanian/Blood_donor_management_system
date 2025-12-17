import express from 'express';
import { updateAdminStatus, getAllUsers, createUserByAdmin, deleteUserByAdmin, getStatistics } from '../controllers/admin.controller.js';


const router = express.Router();

// GET /api/admin/statistics - get statistics for home page
router.get('/statistics', getStatistics);

// GET /api/admin/all - get all users
router.get('/all', getAllUsers);


// POST /api/admin/create - admin creates a user
router.post('/create', createUserByAdmin);


// PATCH /api/admin/:userId - update admin status only
router.patch('/:userId', updateAdminStatus); // keep for admin status


// DELETE /api/admin/:userId - delete user
router.delete('/:userId', deleteUserByAdmin);

export default router;
