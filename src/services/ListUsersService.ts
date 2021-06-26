import { classToClass } from 'class-transformer';
import { getCustomRepository } from 'typeorm';
import { User } from '../entities/User';
import { UsersRepository } from '../repositories/UsersRepository';

export class ListUsersService {
  public async execute(): Promise<User[]> {
    const usersRepository = getCustomRepository(UsersRepository);

    const users = await usersRepository.find();

    return classToClass(users);
  }
}
