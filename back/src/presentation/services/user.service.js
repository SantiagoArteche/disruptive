import { UserModel } from "../../data/mongo/models/user.model.js";
import { CustomError } from "../../domain/errors/custom-error.js";

export class UserService {
  async getAll() {
    try {
      const users = await UserModel.find();
      return users;
    } catch (error) {
      throw error;
    }
  }

  async getById(id) {
    try {
      const user = await UserModel.findById(id);

      if (!user)
        throw CustomError.notFound(`Usuario con el id ${id} no encontrado`);

      return user;
    } catch (error) {
      throw error;
    }
  }

  async create(createUserDto) {
    try {
      const [findByName, findByEmail] = await Promise.all([
        UserModel.findOne({ username: createUserDto.username }),
        UserModel.findOne({
          email: createUserDto.email,
        }),
      ]);

      if (findByName)
        throw CustomError.badRequest(
          `Usuario con el nombre ${createUserDto.username} ya utilizado`
        );

      if (findByEmail)
        throw CustomError.badRequest(
          `Usuario con el email ${createUserDto.email} ya utilizado`
        );

      const newUser = await UserModel.create({ ...createUserDto });

      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    try {
      const user = await UserModel.findByIdAndDelete(id);

      if (!user)
        throw CustomError.notFound(`Usuario con el id ${id} no encontrado`);

      return `Usuario con el id ${id} borrado exitosamente`;
    } catch (error) {
      throw error;
    }
  }
}
