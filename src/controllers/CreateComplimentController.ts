import { CreateComplimentServices } from "@services/CreateComplimentsServices";
import { Request, Response } from "express";

class CreateComplimentController {
  async handle(request: Request, response: Response) {
    const { tag_id, user_sender, user_receiver, message } = request.body;

    const createComplimentServices = new CreateComplimentServices();

    const compliment = await createComplimentServices.execute({
      tag_id,
      user_sender,
      user_receiver,
      message,
    });

    return response.status(201).json(compliment);
  }
}
export { CreateComplimentController };
