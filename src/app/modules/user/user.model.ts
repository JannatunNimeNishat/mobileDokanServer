import { Schema, model } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';
const userSchema = new Schema<TUser,UserModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
     maxlength: [30, 'Name can not be more than 30 characters'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      select: 0,
    },
    role:{
      type:String,
      required:true,
      default:'BRANCH_MANAGER'
      // default:'SELLER'
    },
    imageURL:{
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);
// encrypting password before saving
userSchema.pre('save', async function (){
  this.password = await bcrypt.hash(this.password,Number(config.saltRounds!))
})

//isUserExist static function
userSchema.statics.isUserExists = async function(email:string){
  const existingUser = await User.findOne({email:email}).select("+password");
  return existingUser;
}
// compare password
userSchema.statics.isPasswordMatched = async function (incomingPassword:string,savedPassword:string) {
  const passwordCheck = await bcrypt.compare(incomingPassword,savedPassword);
  return passwordCheck;
}


export const User = model<TUser,UserModel>('User',userSchema);