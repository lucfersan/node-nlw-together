import { hash } from 'bcryptjs';
import { classToClass } from 'class-transformer';
import { StatusCodes } from 'http-status-codes';
import { getCustomRepository } from 'typeorm';
import { User } from '../entities/User';
import { HttpException } from '../errors/HttpException';
import { UsersRepository } from '../repositories/UsersRepository';

type CreateUserRequest = {
  name: string;
  email: string;
  password: string;
  admin?: boolean;
};

export class CreateUserService {
  public async execute({
    name,
    email,
    password,
    admin = false,
  }: CreateUserRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    if (!email) {
      throw new HttpException(
        'Email not provided.',
        StatusCodes.NOT_ACCEPTABLE,
      );
    }

    const userExists = await usersRepository.findOne({ where: { email } });

    if (userExists) {
      throw new HttpException('User already exists.', StatusCodes.CONFLICT);
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
      admin,
    });
    await usersRepository.save(user);

    return classToClass(user);
  }
}
