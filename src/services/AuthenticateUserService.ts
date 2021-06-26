import { compare } from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import { jwtConfig } from '../config/auth';
import { HttpException } from '../errors/HttpException';
import { UsersRepository } from '../repositories/UsersRepository';

type AuthenticateUserRequest = {
  email: string;
  password: string;
};

export class AuthenticateUserService {
  public async execute({
    email,
    password,
  }: AuthenticateUserRequest): Promise<string> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new HttpException(
        'Email/password incorrect.',
        StatusCodes.FORBIDDEN,
      );
    }

    const checkPassword = await compare(password, user.password);

    if (!checkPassword) {
      throw new HttpException(
        'Email/password incorrect.',
        StatusCodes.FORBIDDEN,
      );
    }

    const { secret, expiresIn } = jwtConfig;

    const token = sign(
      {
        name: user.name,
      },
      secret,
      {
        expiresIn,
        subject: user.id,
      },
    );

    return token;
  }
}
