import { Router } from 'express';
import { authMiddleware } from '../../middleware/authMiddleware';

const router = Router();

// Get all products
router.get('/', authMiddleware, (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Get all products endpoint',
  });
});

// Get product by ID
router.get('/:productId', authMiddleware, (req, res) => {
  res.status(200).json({
    status: 'success',
    message: `Get product with ID: ${req.params.productId}`,
  });
});

// Create a new product
router.post('/', authMiddleware, (req, res) => {
  res.status(201).json({
    status: 'success',
    message: 'Create product endpoint',
  });
});

// Update product
router.put('/:productId', authMiddleware, (req, res) => {
  res.status(200).json({
    status: 'success',
    message: `Update product with ID: ${req.params.productId}`,
  });
});

// Delete product
router.delete('/:productId', authMiddleware, (req, res) => {
  res.status(200).json({
    status: 'success',
    message: `Delete product with ID: ${req.params.productId}`,
  });
});

export const productRoutes = router;
