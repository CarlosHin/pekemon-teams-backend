import mongoose from "mongoose";
import config from "../config";

export default async () => {
    mongoose.connect(
        config.databaseURL,
        {
          useNewUrlParser: true,
          useCreateIndex: true,
          useUnifiedTopology: true,
        },
        () => {
          console.log("connected to database");
        }
      );
};
