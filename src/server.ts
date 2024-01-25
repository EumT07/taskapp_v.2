import App from "./app";
import dotenv from "dotenv";
import { startDataBase } from "./config/database";
//.env
dotenv.config();
const server = new App();
//Data base
startDataBase();
server.listen();