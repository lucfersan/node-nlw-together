import { StatusCodes } from 'http-status-codes';
import { getCustomRepository } from 'typeorm';

import { Tag } from '../entities/Tag';
import { HttpException } from '../errors/HttpException';
import { TagsRepository } from '../repositories/TagsRepository';

type CreateTagRequest = {
  name: string;
};

export class CreateTagService {
  public async execute({ name }: CreateTagRequest): Promise<Tag> {
    const tagsRepository = getCustomRepository(TagsRepository);

    if (!name) {
      throw new HttpException(
        'Tag name not provided.',
        StatusCodes.NOT_ACCEPTABLE,
      );
    }

    const tagExists = await tagsRepository.findOne({ where: { name } });

    if (tagExists) {
      throw new HttpException('Tag already exists.', StatusCodes.CONFLICT);
    }

    const tag = tagsRepository.create({ name });
    await tagsRepository.save(tag);

    return tag;
  }
}
