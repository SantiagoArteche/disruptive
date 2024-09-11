import { Router } from "express";
import { UserRoutes } from "./users/routes.js";
import { ThemeRoutes } from "./theme/routes.js";
import { ContentRoutes } from "./content/routes.js";
import swaggerUi from "swagger-ui-express";
import swaggerjsdoc from "swagger-jsdoc";
import { __dirname } from "../path.js";

export class AppRoutes {
  static get routes() {
    const router = Router();
    const options = {
      definition: {
        info: {
          title: "OFF API",
          version: "0.0.1",
          description: "API made for OFF E-Commerce",

          contact: {
            name: "Santiago Arteche",
            url: "https://portfolioarteche.vercel.app/",
            email: "santiagoarteche7@gmail.com",
          },
        },
        openapi: "3.1.0",
        servers: [
          {
            url: "http://localhost:8000/",
          },
        ],
      },
      apis: [`${__dirname}/docs/*.yaml`],
    };

    router.use("/api/users", UserRoutes.routes);
    router.use("/api/theme", ThemeRoutes.routes);
    router.use("/api/content", ContentRoutes.routes);
    router.use(
      "/api/docs",
      swaggerUi.serve,
      swaggerUi.setup(swaggerjsdoc(options))
    );

    return router;
  }
}
