import { Request, Response } from 'express';
import { AuthenticateUserService } from '../services/AuthenticateUserService';

export class AuthenticateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = new AuthenticateUserService();

    const token = await authenticateUser.execute({ email, password });

    return response.json(token);
  }
}
