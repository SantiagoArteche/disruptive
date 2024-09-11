import { CustomError } from "../../domain/errors/custom-error.js";

export class ContentController {
  constructor(contentService) {
    this.contentService = contentService;
  }

  getAllContent = (req, res) => {
    this.contentService
      .getAll()
      .then((content) => res.status(200).json(content))
      .catch((error) => CustomError.handleErrors(error, res));
  };

  createContent = (req, res) => {
    const { userId, themeId } = req.params;

    let files;
    req.files ? (files = req.files) : (files = req.body);

    this.contentService
      .create(files, userId, themeId)
      .then((content) => res.status(200).json(content))
      .catch((error) => CustomError.handleErrors(error, res));
  };

  deleteContent = (req, res) => {
    const { id } = req.params;

    this.contentService
      .delete(id)
      .then((content) => res.status(200).json(content))
      .catch((error) => CustomError.handleErrors(error, res));
  };

  getMedia = (req, res) => {
    const { type, media } = req.params;

    this.contentService
      .getMedia(type, media)
      .then((media) => res.status(200).sendFile(media))
      .catch((error) => CustomError.handleErrors(error, res));
  };
}
