import { Request, Response } from "express";
import { ListUserReceiveComplimentsService } from "./ListUserReceiveComplimentsService";

class ListUserReceiveComplimentsController {
  async handle(request: Request, response: Response) {
    const { user_id } = request;

    const listUserReceiveComplimentsService =
      new ListUserReceiveComplimentsService();

    const compliment = await listUserReceiveComplimentsService.execute(user_id);

    return response.json(compliment);
  }
}
export { ListUserReceiveComplimentsController };
