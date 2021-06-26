import { StatusCodes } from 'http-status-codes';
import { getCustomRepository } from 'typeorm';
import { Compliment } from '../entities/Compliment';
import { HttpException } from '../errors/HttpException';
import { ComplimentsRepository } from '../repositories/ComplimentsRepository';
import { TagsRepository } from '../repositories/TagsRepository';
import { UsersRepository } from '../repositories/UsersRepository';

type CreateComplimentRequest = {
  user_sender: string;
  user_receiver: string;
  tag_id: string;
  message: string;
};

export class CreateComplimentService {
  public async execute({
    user_sender,
    user_receiver,
    tag_id,
    message,
  }: CreateComplimentRequest): Promise<Compliment> {
    const complimentsRepository = getCustomRepository(ComplimentsRepository);

    const usersRepository = getCustomRepository(UsersRepository);

    const tagsRepository = getCustomRepository(TagsRepository);

    if (user_sender === user_receiver) {
      throw new HttpException(
        'The user cannot send a compliment to him or herself.',
        StatusCodes.CONFLICT,
      );
    }

    const userReceiver = await usersRepository.findOne(user_receiver);

    if (!userReceiver) {
      throw new HttpException(
        'The user receiver does not exist.',
        StatusCodes.NOT_FOUND,
      );
    }

    const tag = await tagsRepository.findOne(tag_id);

    if (!tag) {
      throw new HttpException(
        'This tag does not exist.',
        StatusCodes.NOT_FOUND,
      );
    }

    const compliment = complimentsRepository.create({
      user_sender,
      user_receiver,
      tag_id,
      message,
    });
    await complimentsRepository.save(compliment);

    return compliment;
  }
}
