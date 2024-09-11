import { CreateThemeDto } from "../../domain/dto/create-theme.dto.js";
import { CustomError } from "../../domain/errors/custom-error.js";

export class ThemeController {
  constructor(themeService) {
    this.themeService = themeService;
  }

  getAllThemes = (req, res) => {
    this.themeService
      .getAll()
      .then((themes) => res.status(200).json(themes))
      .catch((error) => CustomError.handleErrors(error, res));
  };

  getThemeById = (req, res) => {
    const { id } = req.params;

    this.themeService
      .getById(id)
      .then((theme) => res.status(200).json(theme))
      .catch((error) => CustomError.handleErrors(error, res));
  };

  createTheme = (req, res) => {
    const [error, createThemeDto] = CreateThemeDto.create(req.body);

    if (error) return res.status(400).json(error);

    this.themeService
      .create(createThemeDto)
      .then((newTheme) => res.status(201).json(newTheme))
      .catch((error) => CustomError.handleErrors(error, res));
  };


}
