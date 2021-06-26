import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<Response | void> {
  const { user_id } = request;

  const usersRepository = getCustomRepository(UsersRepository);

  const { admin } = await usersRepository.findOne(user_id);

  if (!admin) {
    return response.status(StatusCodes.UNAUTHORIZED).json({
      error: 'Only admin users can create new tags.',
    });
  }

  return next();
}
