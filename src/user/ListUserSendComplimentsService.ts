import { ComplimentsRepository } from "src/compliment/ComplimentsRepository";
import { getCustomRepository } from "typeorm";

class ListUserSendComplimentsService {
  async execute(user_id: string) {
    const complimentRepository = getCustomRepository(ComplimentsRepository);
    const compliment = await complimentRepository.find({
      where: { user_sender: user_id },
    });
    return compliment;
  }
}

export { ListUserSendComplimentsService };
