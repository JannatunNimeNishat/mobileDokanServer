import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { User } from '../modules/user/user.model';
import { TUserRole } from '../modules/user/user.interface';


const auth = (...requiredRoles:TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new Error('You are not authorized');
    }
    let decoded;
    try {
      decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;
    } catch (error) {
      throw new Error('You are not authorized');
    }

    const { userEmail,userRole } = decoded;
 
    if(requiredRoles && !requiredRoles?.includes(userRole)){
     
      throw new Error('You are not authorized');
    }


    const user = await User.isUserExists(userEmail);

    if (!user) {
      throw new Error('You are not authorized');
    }
    next();
  });
};

export default auth;
