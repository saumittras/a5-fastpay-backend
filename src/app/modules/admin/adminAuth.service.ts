import { User } from "../user/user.model";

const getAllUser = async () => {
  const allUser = await User.find({});
  return allUser;
};

const userBlockUnblock = async (userId: string, action: string) => {
  console.log(userId, action);
  return { userId, action };
};

export const AdminServices = {
  getAllUser,
  userBlockUnblock,
};
