import { AuthenticateUserServices } from "@services/AuthenticateUserServices";
import { Request, Response } from "express";

class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    const authenticateUserService = new AuthenticateUserServices();

    const token = await authenticateUserService.execute({ email, password });

    return response.json(token);
  }
}

export { AuthenticateUserController };
