import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";

export class Server {
  #app = express();
  #corsOptions = {
    origin: function (origin, callback) {
      if (
        ["http://localhost:5173", "http://localhost:8000"].indexOf(origin) !=
          -1 ||
        !origin
      ) {
        callback(null, true);
      } else {
        callback(new Error("Acceso denegado"));
      }
    },
  };

  constructor(port, routes) {
    this.port = port;
    this.routes = routes;
  }

  start() {
    this.#app.use(express.json());
    this.#app.use(express.urlencoded({ extended: true }));
    this.#app.use(
      fileUpload({
        limits: { fileSize: 50 * 1024 * 1024 },
      })
    );
    this.#app.use(cors(this.#corsOptions));

    this.#app.use(this.routes);

    this.#app.listen(this.port, () => {
      console.log(`App running on port ${this.port}`);
    });
  }
}
