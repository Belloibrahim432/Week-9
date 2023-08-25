import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils';



const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authorised = verifyToken(req);
  if (!authorised) {
    return res.status(403).json({ error: 'Unauthorised' });
  }
  next();
};

export default authenticateToken;
