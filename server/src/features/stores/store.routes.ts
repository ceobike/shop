import { Router } from 'express';
import { authMiddleware } from '../../middleware/authMiddleware';

const router = Router();

// Get all stores
router.get('/', authMiddleware, (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Get all stores endpoint',
  });
});

// Get store by ID
router.get('/:storeId', authMiddleware, (req, res) => {
  res.status(200).json({
    status: 'success',
    message: `Get store with ID: ${req.params.storeId}`,
  });
});

// Create a new store
router.post('/', authMiddleware, (req, res) => {
  res.status(201).json({
    status: 'success',
    message: 'Create store endpoint',
  });
});

// Update store
router.put('/:storeId', authMiddleware, (req, res) => {
  res.status(200).json({
    status: 'success',
    message: `Update store with ID: ${req.params.storeId}`,
  });
});

// Delete store
router.delete('/:storeId', authMiddleware, (req, res) => {
  res.status(200).json({
    status: 'success',
    message: `Delete store with ID: ${req.params.storeId}`,
  });
});

export const storeRoutes = router;
