import { Router } from "express";
import { CreateUserController } from "@controllers/CreateUserController";
import { CreateTagController } from "@controllers/CreateTagController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { AuthenticateUserController } from "@controllers/AuthenticateUserController";
import { CreateComplimentController } from "@controllers/CreateComplimentController";

const routes = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const creatComplimentController = new CreateComplimentController();

routes.post("/users", ensureAdmin, createUserController.handle);
routes.post("/tags", createTagController.handle);
routes.post("/login", authenticateUserController.handle);
routes.post("/compliment", creatComplimentController.handle);

export { routes };
