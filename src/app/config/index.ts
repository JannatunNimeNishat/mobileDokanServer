import dotenv from 'dotenv';
import path from 'path';

dotenv.config({path:path.join((process.cwd()),'.env')});


export default {
    port:process.env.PORT,
    db_url:process.env.DB_URL,
    saltRounds :process.env.SALTROUNDS,
    jwt_access_secret: process.env.JWT_ACCESS_SECRET,
    jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
    super_admin_password:process.env.SUPER_ADMIN_PASSWORD
}
