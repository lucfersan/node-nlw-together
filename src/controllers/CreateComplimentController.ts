import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CreateComplimentService } from '../services/CreateComplimentService';

export class CreateComplimentController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { user_receiver, tag_id, message } = request.body;

    const { user_id } = request;

    const createCompliment = new CreateComplimentService();

    const compliment = await createCompliment.execute({
      user_sender: user_id,
      user_receiver,
      tag_id,
      message,
    });

    return response.status(StatusCodes.CREATED).json(compliment);
  }
}
