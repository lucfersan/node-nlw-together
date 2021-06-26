import { EntityRepository, Repository } from 'typeorm';
import { Compliment } from '../entities/Compliment';

@EntityRepository(Compliment)
export class ComplimentsRepository extends Repository<Compliment> {}
