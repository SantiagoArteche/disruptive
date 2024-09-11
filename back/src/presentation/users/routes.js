import { Router } from "express";
import { UserController } from "./controller.js";
import { UserService } from "../services/user.service.js";

export class UserRoutes {
  static get routes() {
    const router = Router();

    const service = new UserService();
    const controller = new UserController(service);

    router.get("/", controller.getAllUsers);
    router.get("/:id", controller.getUserById);
    router.post("/", controller.createUser);
    router.delete("/:id", controller.deleteUser);

    return router;
  }
}
