export class CustomError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }

  static unauthorized(message) {
    return new CustomError(401, message);
  }

  static forbidden(message) {
    return new CustomError(403, message);
  }

  static badRequest(message) {
    return new CustomError(400, message);
  }

  static notFound(message) {
    return new CustomError(404, message);
  }

  static internalServerError(message) {
    return new CustomError(500, message);
  }

  static handleErrors(error, res) {
    if (error instanceof CustomError) {
      return res.status(error.status).json(error.message);
    }

    if (error.kind && error.kind === "ObjectId") {
      return res.status(400).json("El formato del id debe ser un UUID valido");
    }

    return res.status(500).json("Internal Server Error");
  }
}
