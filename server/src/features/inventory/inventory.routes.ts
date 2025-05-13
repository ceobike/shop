import { Router } from 'express';
import { authMiddleware } from '../../middleware/authMiddleware';

const router = Router();

// Get all inventory items
router.get('/', authMiddleware, (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Get all inventory items endpoint',
  });
});

// Get inventory item by ID
router.get('/:inventoryId', authMiddleware, (req, res) => {
  res.status(200).json({
    status: 'success',
    message: `Get inventory item with ID: ${req.params.inventoryId}`,
  });
});

// Create a new inventory item
router.post('/', authMiddleware, (req, res) => {
  res.status(201).json({
    status: 'success',
    message: 'Create inventory item endpoint',
  });
});

// Update inventory item
router.put('/:inventoryId', authMiddleware, (req, res) => {
  res.status(200).json({
    status: 'success',
    message: `Update inventory item with ID: ${req.params.inventoryId}`,
  });
});

// Delete inventory item
router.delete('/:inventoryId', authMiddleware, (req, res) => {
  res.status(200).json({
    status: 'success',
    message: `Delete inventory item with ID: ${req.params.inventoryId}`,
  });
});

export const inventoryRoutes = router;
