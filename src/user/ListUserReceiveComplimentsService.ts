import { ComplimentsRepository } from "src/compliment/ComplimentsRepository";
import { getCustomRepository } from "typeorm";
class ListUserReceiveComplimentsService {
  async execute(user_id: string) {
    const complimentRepository = getCustomRepository(ComplimentsRepository);

    const compliment = await complimentRepository.find({
      where: { user_receiver: user_id },
    });

    return compliment;
  }
}

export { ListUserReceiveComplimentsService };
