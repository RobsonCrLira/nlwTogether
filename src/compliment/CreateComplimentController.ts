import { Request, Response } from "express";
import { CreateComplimentServices } from "./CreateComplimentsServices";

class CreateComplimentController {
  async handle(request: Request, response: Response) {
    const { tag_id, user_receiver, message } = request.body;
    const { user_id } = request;

    const createComplimentServices = new CreateComplimentServices();

    const compliment = await createComplimentServices.execute({
      tag_id,
      user_sender: user_id,
      user_receiver,
      message,
    });

    return response.status(201).json(compliment);
  }
}
export { CreateComplimentController };
