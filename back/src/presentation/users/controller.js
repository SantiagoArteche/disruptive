import { CreateUserDto } from "../../domain/dto/create-user.dto.js";
import { CustomError } from "../../domain/errors/custom-error.js";

export class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  getAllUsers = async (req, res) => {
    this.userService
      .getAll()
      .then((users) => res.status(200).json(users))
      .catch((error) => CustomError.handleErrors(error, res));
  };

  getUserById = async (req, res) => {
    const { id } = req.params;

    this.userService
      .getById(id)
      .then((user) => res.status(200).json(user))
      .catch((error) => CustomError.handleErrors(error, res));
  };

  createUser = async (req, res) => {
    const [error, createUserDto] = CreateUserDto.create(req.body);

    if (error) res.status(400).json(error);

    this.userService
      .create(createUserDto)
      .then((newUser) => res.status(201).json(newUser))
      .catch((error) => CustomError.handleErrors(error, res));
  };

  deleteUser = async (req, res) => {
    const { id } = req.params;

    this.userService
      .delete(id)
      .then((deleted) => res.status(200).json(deleted))
      .catch((error) => CustomError.handleErrors(error, res));
  };
}
