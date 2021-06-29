import { Request, Response } from "express";
import { ListUserSendComplimentsService } from "./ListUserSendComplimentsService";

class ListUserSendComplimentsController {
  async handle(request: Request, response: Response) {
    const { user_id } = request;

    const listUserSendComplimentsService = new ListUserSendComplimentsService();

    const compliment = await listUserSendComplimentsService.execute(user_id);

    return response.json(compliment);
  }
}
export { ListUserSendComplimentsController };
