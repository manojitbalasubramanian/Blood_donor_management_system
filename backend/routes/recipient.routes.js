import express from 'express';
import { 
    handleBloodRequest,
    getAllRecipients,
    getRecipient,
    createRecipient,
    updateRecipient,
    deleteRecipient 
} from '../controllers/recipient.controller.js';
import { protect } from '../middleware/protection.js';

const router = express.Router();

// Public route for blood request
router.post('/request', protect, handleBloodRequest);

// Admin routes for recipient management - temporarily remove admin middleware for testing
router.get('/all', protect, getAllRecipients);
router.get('/:id', protect, getRecipient);
router.post('/create', protect, createRecipient);
router.put('/:id', protect, updateRecipient);
router.delete('/:id', protect, deleteRecipient);

export default router;
