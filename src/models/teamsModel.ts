import mongoose, { ObjectId } from "mongoose";


export interface IPokemon {
  name: string;
  base_experience?: number;
  image: string;
  _user_id: ObjectId;
  abilities: string[];
  types?: string[];
}

export interface ITeam {
  _id: any;
  name:string;
  pokemon_list?:IPokemon[];
  created_at:Date;
  _user_id: ObjectId;
  distance:number
  aprox_time?:number;
}

interface teamModelInterface extends mongoose.Model<TeamDoc> {
  build(attr: ITeam): TeamDoc;
}

interface TeamDoc extends mongoose.Document {
  name:string;
  pokemon_list?:IPokemon[];
  created_at:Date;
  _user_id: ObjectId;
}

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  pokemon_list: {
    type: [Object],
    required: false,
  },
  created_at: {
    type: Date,
    required: true,
  },
  _user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

teamSchema.statics.build = (attr: ITeam) => {
  return new Team(attr);
};

const Team = mongoose.model<TeamDoc, teamModelInterface>(
  "Team",
  teamSchema,
  "teams"
);

export { Team };
