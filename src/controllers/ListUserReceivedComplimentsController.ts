import { Request, Response } from 'express';
import { ListUserReceivedComplimentsService } from '../services/ListUserReceivedComplimentsService';

export class ListUserReceivedComplimentsController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request;

    const listUserReceivedCompliments =
      new ListUserReceivedComplimentsService();

    const compliments = await listUserReceivedCompliments.execute({ user_id });

    return response.json(compliments);
  }
}
