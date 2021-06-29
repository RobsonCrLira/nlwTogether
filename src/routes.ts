import { Router } from "express";
import { AuthenticateUserController } from "@user/AuthenticateUserController";
import { CreateUserController } from "@user/CreateUserController";
import { ListUserReceiveComplimentsController } from "@user/ListUserReceiveComplimentsController";
import { ListUserSendComplimentsController } from "@user/ListUserSendComplimentsController";
import { CreateTagController } from "@tag/CreateTagController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAuthenticate } from "./middlewares/ensureAuthenticate";
import { CreateComplimentController } from "@compliment/CreateComplimentController";
import { ListUsersController } from "@user/ListUsersController";
import { ListTagsControllers } from "@tag/ListTagsControllers";

const routes = Router();

const creatComplimentController = new CreateComplimentController();

const listUserReceiveComplimentsController =
  new ListUserReceiveComplimentsController();
const listUserSendComplimentsController =
  new ListUserSendComplimentsController();
const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const listUsersController = new ListUsersController();

const createTagController = new CreateTagController();
const listTagsController = new ListTagsControllers();

routes.post("/login", authenticateUserController.handle);
routes.post("/users", createUserController.handle);
routes.get("/users", listUsersController.handle);

routes.post(
  "/tags",
  ensureAuthenticate,
  ensureAdmin,
  createTagController.handle
);
routes.get("/tags", ensureAuthenticate, listTagsController.handle);

routes.post(
  "/compliments",
  ensureAuthenticate,
  creatComplimentController.handle
);
routes.get(
  "/users/compliments/send",
  ensureAuthenticate,
  listUserSendComplimentsController.handle
);
routes.get(
  "/users/compliments/receive",
  ensureAuthenticate,
  listUserReceiveComplimentsController.handle
);

export { routes };
