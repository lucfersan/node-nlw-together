import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { verify } from 'jsonwebtoken';
import { jwtConfig } from '../config/auth';

type TokenPayload = {
  iat: number;
  exp: number;
  sub: string;
};

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): Response | void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(StatusCodes.UNAUTHORIZED).json({
      error: 'Token not provided.',
    });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, jwtConfig.secret);

    const { sub } = decoded as TokenPayload;

    request.user_id = sub;

    return next();
  } catch {
    return response.status(StatusCodes.UNAUTHORIZED).json({
      error: 'Invalid token.',
    });
  }
}
