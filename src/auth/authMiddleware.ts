import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const secretKey = 'your-secret-key'; 

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    req.user = decoded; // Store user information in the request object
    next();
  });
};

export default authenticateToken;
