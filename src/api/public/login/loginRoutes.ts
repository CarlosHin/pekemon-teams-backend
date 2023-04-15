import express, { Request, Response } from "express";
import { loginController, UserNotFound } from "./loginController";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
    try{
        const {name, password} = req.body;
        const loginResponse = await loginController.login({name, password})

        res.status(200).send(loginResponse)
    } catch (error) {
        if (error instanceof UserNotFound) return res.status(error.status).send(error.message);
        if (error instanceof Error) return res.status(500).send(error.message);
        return res.status(500).send("Unknown error");
    }
})

export { router as loginRouter };
