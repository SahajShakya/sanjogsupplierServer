import dotenv from "dotenv"
dotenv.config()
import { Sequelize } from "sequelize-typescript";
import { Users } from "../models/users";
import { UserDetails } from "../models/userdetails";
import { refreshToken } from "../utils/AuthUtils";
import { RefreshToken } from "../models/refreshtoken";
import { ResetPassword } from "../models/resetpassword";

const dbconnection = new Sequelize({
    dialect: "postgres",
    host: process.env.DB_HOST as string,
    username: process.env.DB_USERNAME as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.NODE_ENV === 'test'? process.env.DB_DATABASE_NAME_TEST as string : process.env.DB_DATABASE_NAME as string,
    port: Number(process.env.DB_PORT || 5432),
    logging: false,
    models: [
        Users,
        UserDetails,
        RefreshToken,
        ResetPassword,
    ],
  });
  export default dbconnection;