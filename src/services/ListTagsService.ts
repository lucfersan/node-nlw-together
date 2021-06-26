import { classToPlain } from 'class-transformer';
import { getCustomRepository } from 'typeorm';
import { Tag } from '../entities/Tag';
import { TagsRepository } from '../repositories/TagsRepository';

export class ListTagsService {
  public async execute(): Promise<Record<string, Tag>> {
    const tagsRepository = getCustomRepository(TagsRepository);

    const tags = await tagsRepository.find();

    return classToPlain(tags);
  }
}
