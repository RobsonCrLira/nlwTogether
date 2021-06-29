import { AppError } from "@errors/AppError";
import { ComplimentsRepository } from "src/compliment/ComplimentsRepository";
import { getCustomRepository } from "typeorm";
import * as yup from "yup";
class ListUserSendComplimentsService {
  async execute(user_id: string) {
    const schema = yup.string().uuid().required();

    try {
      await schema.validate(user_id);
    } catch (error) {
      throw new AppError(error);
    }

    const complimentRepository = getCustomRepository(ComplimentsRepository);

    const compliment = await complimentRepository.find({
      where: { user_sender: user_id },
    });

    return compliment;
  }
}

export { ListUserSendComplimentsService };
