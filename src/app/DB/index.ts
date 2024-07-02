import config from "../config";
import { USER_ROLE } from "../modules/user/user.constant";
import { User } from "../modules/user/user.model";

const superAdminData = {
  name: 'superAdmin',
  email: 'superAdmin@gmail.com',
  password: config.super_admin_password,
  role:USER_ROLE.SUPER_ADMIN
};

const seedSuperAdmin = async()=>{
    const isSuperAdminAlreadyExists = await User.findOne({role:USER_ROLE.SUPER_ADMIN});
    
    if(!isSuperAdminAlreadyExists){
        await User.create(superAdminData);
    }
}

export default seedSuperAdmin;



