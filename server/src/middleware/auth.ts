import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // TODO: verify the token exists and add the user data to the request object
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    const secretKey = process.env.JWT_SECRET_KEY || 'AAAAAAGGGHH'

    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        res.sendStatus(403);
        return;
      }

      req.user = user as JwtPayload;
      next();
    });
  } else {
  res.sendStatus(401);
  }
};
