import { Compliment } from "@entities/Compliment";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Compliment)
class ComplimentsRepository extends Repository<Compliment> {}

export { ComplimentsRepository };
