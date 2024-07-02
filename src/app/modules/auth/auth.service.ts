import config from '../../config';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import jwt from 'jsonwebtoken';

type TJwtPayload = {
  userName: string;
  userEmail: string;
  userRole:string;
  imageURL?:string;
}

const loginUserIntoDB = async (payload: TLoginUser) => {
  const user = await User.isUserExists(payload?.email);
  if (!user) {
    throw new Error("User doesn't exist");
  }
  //password checking
  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new Error('wrong password');
  }
  //creating accessToken
  const jwtPayload:TJwtPayload = {
    userName: user?.name,
    userEmail: user?.email,
    userRole:user?.role,
  };

  if(user?.imageURL){
    jwtPayload.imageURL=user?.imageURL
  }
  // console.log(jwtPayload);
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_expires_in,
  });

  if (!accessToken) {
    throw new Error('Something went wrong');
  }
  return accessToken;
};

export const authServices = {
  loginUserIntoDB,
};
