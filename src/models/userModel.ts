import mongoose from "mongoose";

interface IUser {
    name: string,
    passwordHash: string,
}

interface userModelInterface extends mongoose.Model<UserDoc> {
  build(attr: IUser): UserDoc;
}

interface UserDoc extends mongoose.Document {
    name: string,
    passwordHash: string,
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
});

userSchema.statics.build = (attr: IUser) => {
  return new User(attr);
};

const User = mongoose.model<UserDoc, userModelInterface>(
  "User",
  userSchema,
  "users"
);

export { User };
