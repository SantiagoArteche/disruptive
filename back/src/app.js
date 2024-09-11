import { Mongo } from "./data/mongo/init.js";
import { AppRoutes } from "./presentation/routes.js";
import { Server } from "./presentation/server.js";
import "dotenv/config";

(async () => {
  await main();
})();

async function main() {
  const server = new Server(8000, AppRoutes.routes);
  await server.start();
  Mongo.connection();
}
