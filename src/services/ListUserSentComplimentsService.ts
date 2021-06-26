import { getCustomRepository } from 'typeorm';
import { Compliment } from '../entities/Compliment';
import { ComplimentsRepository } from '../repositories/ComplimentsRepository';

type ListUserSentComplimentsRequest = {
  user_id: string;
};

export class ListUserSentComplimentsService {
  public async execute({
    user_id,
  }: ListUserSentComplimentsRequest): Promise<Compliment[]> {
    const complimentsRepository = getCustomRepository(ComplimentsRepository);

    const compliments = await complimentsRepository.find({
      where: {
        user_sender: user_id,
      },
    });

    return compliments;
  }
}
