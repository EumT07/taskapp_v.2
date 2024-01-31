import express, {Application, Response, Request} from "express";
import helmet from "helmet";
import "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "node:path";
import {fileURLToPath} from "node:url";


//Routes
import home from "./routes/home";
import auth from "./routes/auth";
import admin from "./routes/admin";
import settings from "./routes/settings";
import recovery from "./routes/recovery";
import error from "./routes/error";
import securityMethods from "./routes/security.methods";

//Services
import { adminRole } from "./services/admin";
import { createRoles } from "./services/roles";

dotenv.config();

class App {
    private app: Application;
    private port: string;
    // private __filename = fileURLToPath(import.meta.url);
    // private __dirname = path.dirname(__filename);
    
    //Routes
    private apiPath = {
        home: "/api/v2/",
        admin: "/api/v2/admin",
        auth: "/api/v2/auth",
        settings: "/api/v2/settings",
        recovery: "/api/v2/recovery",
        security: "/api/v2/security",
        errorPage: "/api/v2/error"
    }

    constructor(){
        this.app = express();
        this.port = process.env.PORT || "4000";
        //Calling functions
        this.methods();
        //Middlewares
        this.middlewares()
        //Routes
        this.routes()
    }
    //middlewares
    middlewares(){
        this.app.use(morgan("dev"));
        this.app.use(helmet());
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(cookieParser());
        this.app.use(express.urlencoded({extended:true}));
        //Publics files
        this.app.use(express.static("./public"));
    }

    //Routing
    routes(){
        this.app.use(this.apiPath.home, home);
        this.app.use(this.apiPath.auth, auth);
        this.app.use(this.apiPath.admin, admin);
        this.app.use(this.apiPath.settings, settings);
        this.app.use(this.apiPath.recovery, recovery);
        this.app.use(this.apiPath.security, securityMethods);
        this.app.use(this.apiPath.errorPage, error);
        this.app.all("*",(req,res)=>{
            res.redirect(`${this.apiPath.errorPage}/notfound`);
        })
    }

    //Importing Admin and Role Functions
    methods(){
        createRoles();
        adminRole();
    }
    //Server Function
    listen(){
        this.app.listen(this.port, ()=>{
            try {
                console.log(`Server Running on http://localhost`.bgGreen, `:${this.port} `.black.bgYellow);
            } catch (error) {
                console.log("Server Error".red);
                console.log("Error Message: ",error);
            }
            
        })
    }
}


export default App;