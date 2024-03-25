import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface CustomRequest extends Request {
  user?: Record<string, any>;
}

const auth = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        error: 'Missing Authorization Header',
      });
    }

    const decodedToken = jwt.verify(token, process.env.JWTTOKEN as string);

    const user = decodedToken as Record<string, any>;

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      error: 'Invalid Token',
    });
  }
};

export default auth;
