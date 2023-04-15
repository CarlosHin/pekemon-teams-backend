import { User } from "../../../models/userModel";

export const userController = {
  async create({
    name,
    passwordHash,
  }: {
    name: string;
    passwordHash: string;
  }) {
    try {
      const findUser = await User.find({ name: name });
      if (findUser.length > 0) throw new Error(`Username ${name} Already exist`);

      const user = User.build({ name, passwordHash });
      await user.save();
      return user;
    } catch (error) {
      if (error instanceof Error)
        throw new Error("Error creating user: " + error.message);
      throw new Error("Error creating user");
    }
  },

  async getAll() {
    try {
      const users = await User.find({});
      return users.map(user => ({name:user.name}));
    } catch (error) {
      if (error instanceof Error)
        throw new Error("Error creating user: " + error.message);
      throw new Error("Error creating user:");
    }
  },
};
