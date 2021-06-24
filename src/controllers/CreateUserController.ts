import { Request, Response } from "express";
import { CreateUsersServices } from "@services/CreateUsersServices";

class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, email, password, admin } = request.body;

    const createUserServices = new CreateUsersServices();

    const user = await createUserServices.execute({
      name,
      email,
      password,
      admin,
    });

    return response.status(201).json(user);
  }
}
export { CreateUserController };
