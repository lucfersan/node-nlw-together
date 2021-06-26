import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { CreateUserService } from '../services/CreateUserService';

export class CreateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password, admin } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({ name, email, password, admin });

    return response.status(StatusCodes.CREATED).json(user);
  }
}
