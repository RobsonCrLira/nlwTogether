import { Tag } from "@entities/Tag";
import { AppError } from "@errors/AppError";
import { getCustomRepository, Repository } from "typeorm";
import { TagRepository } from "./TagsRepository";
import * as yup from "yup";
class CreateTagsServices {
  private tagRepository: Repository<Tag>;

  constructor() {
    this.tagRepository = getCustomRepository(TagRepository);
  }
  async execute(name: string) {
    const schema = yup.string().required();

    try {
      await schema.validate(name);
    } catch (error) {
      throw new AppError(error);
    }

    const tagAlreadyExists = await this.tagRepository.findOne({ name });

    if (tagAlreadyExists) {
      throw new AppError("Tag already exists!");
    }

    const tag = this.tagRepository.create({ name });

    await this.tagRepository.save(tag);

    return tag;
  }
}
export { CreateTagsServices };
