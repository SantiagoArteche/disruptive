export class CreateThemeDto {
  constructor(name) {
    this.name = name;
  }

  static create(obj) {
    const { name } = obj;
    const validNames = ["CIENCIAS", "MATEMÁTICAS", "DEPORTE"];

    if (!name) return ["El nombre del tema es requerido"];

    if (typeof name !== "string") return ["El nombre debe ser de tipo string"];

    if (!validNames.includes(name.toUpperCase()))
      return [
        `El nombre del tema es invalido , los nombres validos son ${validNames}`,
      ];

    return [undefined, new CreateThemeDto(name.toUpperCase())];
  }
}
