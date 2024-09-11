import mongoose from "mongoose";

export class Mongo {
  static async connection() {
    await mongoose
      .connect(
        "mongodb+srv://santiarteche:KWcFQTEyzx5ahp3p@cluster0.yc7ey.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
        { dbName: "disruptive" }
      )
      .then(() => {
        console.log("MongoDB connected");
      })
      .catch((error) => console.log(error));
  }
}
