/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export type TUser = {
    name:string;
    email:string;
    password:string;
    role:string;
    imageURL:string;
}

export interface UserModel extends Model<TUser> {
    isUserExists(email:string):Promise<TUser | null>,
    isPasswordMatched(incomingPassword:string,savedPassword:string):Promise<boolean>
}

export type TUserRole = keyof typeof USER_ROLE;