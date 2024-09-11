import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "El nombre de usuario es obligatorio"],
    },
    email: {
      type: String,
      required: [true, "El email es obligatorio"],
    },
    role: {
      type: String,
      enum: ["ADMIN", "LECTOR", "CREADOR"],
      default: "LECTOR",
    },
  },
  {
    versionKey: false,
  }
);

export const UserModel = model("User", UserSchema);
