import express, {Application} from "express";
import "colors";
import dotenv from "dotenv";
//Routes
import home from "./routes/home";

dotenv.config();

class App {
    private app: Application;
    private port: string;
    

    //Routes
    private apiPath = {
        home: "/api/v2/",
        auth: "/api/v2/auth",
        errorPage: "/api/v2/error"
    }


    constructor(){
        this.app = express();
        this.port = process.env.PORT || "4000";

        //Middlewares

        //Routes
        this.routes()
    }

    //Routing
    routes(){
        this.app.use(this.apiPath.home, home);
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