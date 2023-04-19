import express, { Request, Response } from "express";
import { teamsController } from "./teamsController";
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const teams = await teamsController.getMine(res.locals.decodedToken.id);
    return res.status(200).send(teams);
  } catch (error) {
    if (error instanceof Error) return res.status(400).send(error.message);
    return res.status(400).send("Unknown error");
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const team = {
      ...req.body.team,
      created_at: new Date(),
      _user_id: res.locals.decodedToken.id,
    };
    const newTeam = await teamsController.create(team);
    return res.status(200).send({ msg: "Team created", route: newTeam });
  } catch (error) {
    if (error instanceof Error) return res.status(400).send(error.message);
    return res.status(400).send("Unknown error");
  }
});

router.patch("/", async (req: Request, res: Response) => {
  try {
    const team = req.body.team;
    await teamsController.update(team);
    return res.status(200).send({ msg: "Team Saved"});
  } catch (error) {
    if (error instanceof Error) return res.status(400).send(error.message);
    return res.status(400).send("Unknown error");
  }
});

router.delete("/", async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    await teamsController.delete(id,res.locals.decodedToken.id);
    return res.status(200).send({ msg: "Team deleted" });
  } catch (error) {
    if (error instanceof Error) return res.status(500).send(error.message);
    return res.status(400).send("Unknown error");
  }
});

export { router as teamsRouter };
