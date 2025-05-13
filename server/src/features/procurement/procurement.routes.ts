import { Router } from 'express';
import { authMiddleware } from '../../middleware/authMiddleware';

const router = Router();

// Get all procurement orders
router.get('/', authMiddleware, (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Get all procurement orders endpoint',
  });
});

// Get procurement order by ID
router.get('/:procurementId', authMiddleware, (req, res) => {
  res.status(200).json({
    status: 'success',
    message: `Get procurement order with ID: ${req.params.procurementId}`,
  });
});

// Create a new procurement order
router.post('/', authMiddleware, (req, res) => {
  res.status(201).json({
    status: 'success',
    message: 'Create procurement order endpoint',
  });
});

// Update procurement order
router.put('/:procurementId', authMiddleware, (req, res) => {
  res.status(200).json({
    status: 'success',
    message: `Update procurement order with ID: ${req.params.procurementId}`,
  });
});

// Delete procurement order
router.delete('/:procurementId', authMiddleware, (req, res) => {
  res.status(200).json({
    status: 'success',
    message: `Delete procurement order with ID: ${req.params.procurementId}`,
  });
});

export const procurementRoutes = router;
