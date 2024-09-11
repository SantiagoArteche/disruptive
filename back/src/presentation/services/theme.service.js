import { ThemeModel } from "../../data/mongo/models/theme.model.js";
import { CustomError } from "../../domain/errors/custom-error.js";

export class ThemeService {
  async getAll() {
    try {
      const themes = await ThemeModel.find();

      return themes;
    } catch (error) {
      throw error;
    }
  }

  async getById(id) {
    try {
      const theme = await ThemeModel.findById(id);

      if (!theme)
        throw CustomError.notFound(`Tema con el id ${id} no encontrado`);

      return theme;
    } catch (error) {
      throw error;
    }
  }

  async create(createThemeDto) {
    try {
      const findTheme = await ThemeModel.findOne({
        name: createThemeDto.name,
      });

      if (findTheme)
        throw CustomError.badRequest(
          `El tema con el nombre ${createThemeDto.name} ya existe`
        );

      const newTheme = await ThemeModel.create({ name: createThemeDto.name });

      return newTheme;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
