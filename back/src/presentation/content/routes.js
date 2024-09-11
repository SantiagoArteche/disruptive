import { Router } from "express";
import { ContentController } from "./controller.js";
import { ContentService } from "../services/content.service.js";

export class ContentRoutes {
  static get routes() {
    const router = Router();

    const service = new ContentService();
    const controller = new ContentController(service);

    router.get("/", controller.getAllContent);
    router.post("/:userId/:themeId", controller.createContent);
    router.delete("/:id", controller.deleteContent);
    router.get("/:type/:media", controller.getMedia);

    return router;
  }
}
