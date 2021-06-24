import { Tag } from "@entities/Tag";
import { TagRepository } from "@repositories/TagsRepository";
import { getCustomRepository, Repository } from "typeorm";

class CreateTagsServices {
  private tagRepository: Repository<Tag>;

  constructor() {
    this.tagRepository = getCustomRepository(TagRepository);
  }
  async execute(name: string) {
    if (!name) {
      throw new Error("Incorrect name!");
    }

    const tagAlreadyExists = await this.tagRepository.findOne({ name });

    if (tagAlreadyExists) {
      throw new Error(`Tag already exists ${tagAlreadyExists}`);
    }

    const tag = this.tagRepository.create({ name });

    await this.tagRepository.save(tag);

    return tag;
  }
}
export { CreateTagsServices };
