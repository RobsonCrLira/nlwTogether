import { Tag } from "@entities/Tag";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Tag)
class TagRepository extends Repository<Tag> {}
export { TagRepository };
