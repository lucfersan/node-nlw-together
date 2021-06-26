import { Request, Response } from 'express';
import { ListUserSentComplimentsService } from '../services/ListUserSentComplimentsService';

export class ListUserSentComplimentsController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request;

    const listUserSentCompliments = new ListUserSentComplimentsService();

    const compliments = await listUserSentCompliments.execute({ user_id });

    return response.json(compliments);
  }
}
