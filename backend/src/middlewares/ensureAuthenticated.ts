import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from "../config/auth";

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(request: Request, response: Response, next: NextFunction): void {
  const authHeader = request.headers.authorization;
  if (!authHeader) throw Error('JWT token is missing.')

  const [, token] = authHeader.split(' ')
  try {
    const decoded = verify(token, authConfig.jwt.secret) // verify token
    const { sub } = decoded as TokenPayload; // force interface
    request.user = { // add user id to all authenticated routes
      id: sub
    }
    next();

  } catch {
    throw new Error('Invalid JWT token')
  }

}
