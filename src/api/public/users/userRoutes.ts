import express, { Request, Response } from "express";
import { userController } from "./userController";
import bcrypt from "bcrypt";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await userController.getAll();
    return res.status(200).send(users);
  } catch (error) {
    if (error instanceof Error) return res.status(400).send(error.message);
    return res.status(400).send("Unknown error");
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, password } = req.body;
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    await userController.create({ name, passwordHash });
    return res.status(200).send(`User ${name} created`);
  } catch (error) {
    if (error instanceof Error) return res.status(400).send(error.message);
    return res.status(400).send("Unknown error");
  }
});

export { router as userRouter };
