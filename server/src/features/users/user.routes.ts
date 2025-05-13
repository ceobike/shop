import { Router } from 'express';
import { authMiddleware } from '../../middleware/authMiddleware';
import { roleMiddleware } from '../../middleware/roleMiddleware';
import { UserRole } from './user.model';

const router = Router();

// Get all users (admin only)
router.get('/', authMiddleware, roleMiddleware([UserRole.ADMIN]), (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Get all users endpoint',
  });
});

// Get user by ID
router.get('/:userId', authMiddleware, (req, res) => {
  res.status(200).json({
    status: 'success',
    message: `Get user with ID: ${req.params.userId}`,
  });
});

// Create a new user (admin only)
router.post('/', authMiddleware, roleMiddleware([UserRole.ADMIN]), (req, res) => {
  res.status(201).json({
    status: 'success',
    message: 'Create user endpoint',
  });
});

// Update user
router.put('/:userId', authMiddleware, (req, res) => {
  res.status(200).json({
    status: 'success',
    message: `Update user with ID: ${req.params.userId}`,
  });
});

// Delete user (admin only)
router.delete('/:userId', authMiddleware, roleMiddleware([UserRole.ADMIN]), (req, res) => {
  res.status(200).json({
    status: 'success',
    message: `Delete user with ID: ${req.params.userId}`,
  });
});

export const userRoutes = router;
