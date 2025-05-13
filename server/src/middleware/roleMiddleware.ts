import { Request, Response, NextFunction } from 'express';
import { UserRole } from '../features/users/user.model';
import { logger } from '../utils/logger';

// Role middleware
export const roleMiddleware = (roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Check if user exists in request
      if (!req.user) {
        return res.status(401).json({
          status: 'error',
          message: 'Authentication required',
        });
      }

      // Check if user has required role
      if (!roles.includes(req.user.role as UserRole)) {
        return res.status(403).json({
          status: 'error',
          message: 'Insufficient permissions',
        });
      }

      next();
    } catch (error) {
      logger.error('Role middleware error:', error);
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error',
      });
    }
  };
};
