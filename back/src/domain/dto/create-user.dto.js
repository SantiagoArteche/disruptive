export class CreateUserDto {
  constructor(username, email, role) {
    this.username = username;
    this.email = email;
    this.role = role;
  }

  static create(obj) {
    const { username, email, role } = obj;
    const validRoles = ["ADMIN", "LECTOR", "CREADOR"];

    if (!username) return ["El nombre de usuario es obligatorio"];

    if (typeof username !== "string")
      return ["El nombre del usuario debe ser de tipo string"];

    if (username.length < 3 || username.length > 40)
      return ["El nombre del usuario debe tener entre 3 y 40 caracteres"];

    if (!email) return ["El email es obligatorio"];
    if (typeof email != "string") return ["El email debe ser de tipo string"];

    if (!email.includes("@") || !email.includes("."))
      return ["Formato de email incorrecto"];

    if (!role) return ["El tipo de permiso es obligatorio"];

    if (!validRoles.includes(role.toUpperCase()))
      return [
        `El rol que inserto es invalido, los roles validos son ${validRoles}`,
      ];

    return [undefined, new CreateUserDto(username, email, role.toUpperCase())];
  }
}
