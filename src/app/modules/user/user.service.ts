/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { TUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (userData: TUser) => {
  if((await User.isUserExists(userData.email))){
    throw new Error('User already exist');
  }
  const result = await User.create(userData);
  const {password,...restData} = result.toObject();
  return restData;
};

export const userService = {
  createStudentIntoDB,
};
