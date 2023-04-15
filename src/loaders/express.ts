import * as express from "express";
import { json } from "body-parser";
import cors from "cors";
import { userRouter } from "../api/public/users/userRoutes";
import { loginRouter } from "../api/public/login/loginRoutes";
import { isLogged } from "../middlewares/isLogged";
import { teamsRouter } from "../api/private/teams/teamsRoutes";
import { addHeaders } from "../middlewares/addHeaders";

export default async ({ app }: { app: express.Application }) => {
  app.use(json());
  app.use(addHeaders);
  app.use("/api/public/users", userRouter);
  app.use("/api/public/login", loginRouter);
  app.use("/api/private/teams", isLogged, teamsRouter);
  app.use(cors({
    origin: '*'
  }));
  return app;
};
