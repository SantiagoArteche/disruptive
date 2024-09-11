import { Schema, model } from "mongoose";

const ThemeSchema = new Schema(
  {
    name: {
      type: String,
      enum: ["CIENCIAS", "MATEMÁTICAS", "DEPORTE"],
      required: [true, "El nombre del tema es requerido"],
    },
  },
  {
    versionKey: false,
  }
);

export const ThemeModel = model("Theme", ThemeSchema);
