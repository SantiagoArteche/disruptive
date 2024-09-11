import { Schema, model, now } from "mongoose";

const ContentSchema = new Schema(
  {
    category: {
      type: String,
      enum: ["IMAGENES", "URL-VIDEOS", "TXT"],
      required: [true, "La categoría del contenido es obligatoria"],
    },
    media: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    theme: {
      type: Schema.Types.ObjectId,
      ref: "Theme",
      required: true,
    },
    createdAt: {
      type: Date,
      default: now(),
    },
  },
  { versionKey: false }
);

export const ContentModel = model("Content", ContentSchema);
