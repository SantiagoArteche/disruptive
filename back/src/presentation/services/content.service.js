import { CustomError } from "../../domain/errors/custom-error.js";
import { __dirname } from "../../path.js";
import { v4 } from "uuid";
import fs from "fs";
import path from "path";
import {
  ContentModel,
  ThemeModel,
  UserModel,
} from "../../data/mongo/models/index.js";

export class ContentService {
  async getAll() {
    try {
      const content = await ContentModel.find()
        .populate("user theme", "username name")
        .sort("createdAt");

      return content;
    } catch (error) {
      throw error;
    }
  }

  async create({ file }, userId, themeId) {
    const [uploadPath, mediaFolder, txtFolder] = await this.#createFolders();

    if (!userId || !themeId)
      throw CustomError.badRequest("Id del usuario o del tema no ingresados");

    try {
      const [user, theme] = await Promise.all([
        UserModel.findById(userId),
        ThemeModel.findById(themeId),
      ]);

      if (!user || !theme)
        throw CustomError.badRequest("Usuario o tema no encontrados");

      if (typeof file === "object") {
        const validExtensions = ["txt", "jpg", "png", "jpeg", "mp4"];
        const filename = file.name.split(".");

        if (filename.length > 2)
          throw CustomError.badRequest(
            "El archivo no debe tener puntos en el nombre"
          );

        const extension = filename[1];

        if (!validExtensions.includes(extension))
          return `Tipo de archivo invalido, los validos son: ${validExtensions} o urls de youtube`;

        const name = `${filename[0]}-${v4()}`;

        if (extension === "txt") {
          fs.appendFileSync(
            path.join(txtFolder, `${name}.${extension}`),
            file.data.toString()
          );

          await ContentModel.create({
            category: "TXT",
            user: user._id,
            theme: theme._id,
            media: `${name}.${extension}`,
            createdAt: Date.now(),
          });
        } else if (extension === "mp4") {
          fs.appendFileSync(
            path.join(mediaFolder, `${name}.${extension}`),
            file.data
          );

          await ContentModel.create({
            category: "URL-VIDEOS",
            user: user._id,
            theme: theme._id,
            media: `${name}.${extension}`,
            createdAt: Date.now(),
          });
        } else {
          fs.appendFileSync(
            path.join(mediaFolder, `${name}.${extension}`),
            file.data
          );

          await ContentModel.create({
            category: "IMAGENES",
            user: user._id,
            theme: theme._id,
            media: `${name}.${extension}`,
            createdAt: Date.now(),
          });
        }

        return `File ${name}.${extension} created`;
      } else {
        const urlsFile = path.resolve(uploadPath, "urls.txt");
        if (!fs.existsSync(urlsFile)) fs.appendFileSync(urlsFile, "");

        if (!file.includes("https://www.youtube.com/watch?v="))
          throw CustomError.badRequest("Url invalida");

        const fileContent = fs.readFileSync(urlsFile).toString();
        const urlSplited = file.split("&")[0];
        if (fileContent.includes(urlSplited))
          throw CustomError.badRequest(
            "Esta url ya se encuentra en el archivo!"
          );

        fs.appendFileSync(urlsFile, `${file}\n`);
        await ContentModel.create({
          category: "URL-VIDEOS",
          user: user._id,
          theme: theme._id,
          media: `${file}`,
          createdAt: Date.now(),
        });

        return `Url ${file} agregada!`;
      }
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    try {
      const deleteContent = await ContentModel.findByIdAndDelete(id);

      if (!deleteContent)
        throw CustomError.notFound(`Contenido con id ${id} no encontrado`);

      return `Contenido con id ${id} borrado!`;
    } catch (error) {
      throw error;
    }
  }

  async getMedia(type, media) {
    try {
      const mediaPath = path.resolve(__dirname, `../uploads/${type}/${media}`);

      if (!fs.existsSync(mediaPath))
        throw CustomError.badRequest("El archivo no existe!");

      return mediaPath;
    } catch (error) {
      throw error;
    }
  }

  async #createFolders() {
    const uploadPath = path.resolve(__dirname, "../uploads");
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);

    const mediaFolder = path.resolve(uploadPath, "./media");
    if (!fs.existsSync(mediaFolder)) fs.mkdirSync(mediaFolder);

    const txtFolder = path.resolve(uploadPath, "./txt");
    if (!fs.existsSync(txtFolder)) fs.mkdirSync(txtFolder);

    return [uploadPath, mediaFolder, txtFolder];
  }
}
