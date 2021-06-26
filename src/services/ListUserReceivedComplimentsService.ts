import { getCustomRepository } from 'typeorm';
import { Compliment } from '../entities/Compliment';
import { ComplimentsRepository } from '../repositories/ComplimentsRepository';

type ListUserReceivedComplimentsRequest = {
  user_id: string;
};

export class ListUserReceivedComplimentsService {
  public async execute({
    user_id,
  }: ListUserReceivedComplimentsRequest): Promise<Compliment[]> {
    const complimentsRepository = getCustomRepository(ComplimentsRepository);

    const compliments = await complimentsRepository.find({
      where: {
        user_receiver: user_id,
      },
    });

    return compliments;
  }
}
