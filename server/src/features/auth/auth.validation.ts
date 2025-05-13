import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

// Validate login request
export const validateLogin = [
  // Username validation
  body('username')
    .notEmpty()
    .withMessage('Username is required'),

  // Password validation
  body('password')
    .notEmpty()
    .withMessage('Password is required'),

  // Check validation results
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation error',
        errors: errors.array(),
      });
    }
    next();
  },
];
