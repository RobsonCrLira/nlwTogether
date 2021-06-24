import { CreateTagsServices } from "@services/CreateTagsServices";
import { Request, Response } from "express";
class CreateTagController {
  async handle(request: Request, response: Response) {
    const { name } = request.body;

    const createTagServices = new CreateTagsServices();

    const user = await createTagServices.execute(name);

    return response.status(201).json(user);
  }
}
export { CreateTagController };
