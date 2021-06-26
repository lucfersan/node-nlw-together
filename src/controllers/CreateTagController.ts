import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { CreateTagService } from '../services/CreateTagService';

export class CreateTagController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createTag = new CreateTagService();

    const tag = await createTag.execute({ name });

    return response.status(StatusCodes.CREATED).json(tag);
  }
}
