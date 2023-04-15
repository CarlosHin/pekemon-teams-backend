const dotenv = require("dotenv");
// config() leerá su archivo .env, analizará el contenido, lo asignará a process.env.
dotenv.config();

export default {
  port: process.env.PORT || 3000,
  databaseURL: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.rtfuv.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  secret: process.env.SECRET || "",
};
