import { Router } from "express";
import { ThemeController } from "./controller.js";
import { ThemeService } from "../services/theme.service.js";

export class ThemeRoutes {
  static get routes() {
    const router = Router();

    const service = new ThemeService();
    const controller = new ThemeController(service);

    router.get("/", controller.getAllThemes);
    router.get("/:id", controller.getThemeById);
    router.post("/", controller.createTheme);

    return router;
  }
}
