import { Router } from 'express';
import { authMiddleware } from '../../middleware/authMiddleware';

const router = Router();

// Get all orders
router.get('/', authMiddleware, (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Get all orders endpoint',
  });
});

// Get order by ID
router.get('/:orderId', authMiddleware, (req, res) => {
  res.status(200).json({
    status: 'success',
    message: `Get order with ID: ${req.params.orderId}`,
  });
});

// Create a new order
router.post('/', authMiddleware, (req, res) => {
  res.status(201).json({
    status: 'success',
    message: 'Create order endpoint',
  });
});

// Update order
router.put('/:orderId', authMiddleware, (req, res) => {
  res.status(200).json({
    status: 'success',
    message: `Update order with ID: ${req.params.orderId}`,
  });
});

// Delete order
router.delete('/:orderId', authMiddleware, (req, res) => {
  res.status(200).json({
    status: 'success',
    message: `Delete order with ID: ${req.params.orderId}`,
  });
});

export const orderRoutes = router;
