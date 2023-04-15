import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../../../models/userModel";
import config from "../../../config";

export class UserNotFound extends Error {
  status: number;
  constructor(msg: string) {
    super(msg);
    this.status = 401;
    Object.setPrototypeOf(this, UserNotFound.prototype);
  }
}

export const loginController = {
  async login({ name, password }: { name: string; password: string }) {
    try {
      if (!name || !password)
        throw new Error("Please send username and password");
      const user = await User.findOne({ name: name });
      if (!user) throw new UserNotFound("Invalid username");

      const passwordCorrect = await bcrypt.compare(password, user.passwordHash);
      if (!passwordCorrect) throw new UserNotFound("Invalid password");

      const userForToken = {
        name: user.name,
        id: user._id,
      };

      const token = jwt.sign(userForToken, config.secret!);
      return { token, name: user.name };
    } catch (error) {
      if (error instanceof Error)
        throw new Error("Error on login: " + error.message);
      throw new Error("Error on login");
    }
  },
};
