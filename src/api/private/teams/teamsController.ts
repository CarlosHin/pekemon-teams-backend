import { ObjectId } from "mongoose";
import { Team, ITeam } from "../../../models/teamsModel";

export const teamsController = {
  async create(team: ITeam) {
    try {
      const newTeam = Team.build(team);
      await newTeam.save();
      return newTeam;
    } catch (error) {
      if (error instanceof Error)
        throw new Error("Error creating team:" + error.message);
      throw new Error("Error creating team");
    }
  },

  async update(team: ITeam) {
    try {
      const filter = { _id: team._id, _user_id: team._user_id };
      const update = { ...team };
      const a = await Team.findOneAndUpdate(filter, update);
    } catch (error) {
      if (error instanceof Error)
        throw new Error("Error saving team:" + error.message);
      throw new Error("Error saving team");
    }
  },

  async getMine(userId: ObjectId) {
    try {
      const teams = await Team.find({ _user_id: userId }).sort({'created_at': -1});
      return teams;
    } catch (error) {
      if (error instanceof Error)
        throw new Error("Error geting team: " + error.message);
      throw new Error("Error geting teams");
    }
  },

  async delete(teamId: ObjectId, userId:ObjectId) {
    try {
      const deleteOneResponse = await Team.deleteOne({_id:teamId, _user_id:userId});
      if (deleteOneResponse.deletedCount === 0) throw new Error("Team not Found");
    } catch (error) {
      if (error instanceof Error)
        throw new Error("Error deleting team: " + error.message);
      throw new Error("Error deleting team");
    }
  },
};
