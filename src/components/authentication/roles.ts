import Role from "../../database/models/roles";
import { handleErrorServer } from "../../utils/errorHandle";
import util from "node:util";


//time sleep
const sleep = util.promisify(setTimeout);

/**
 * Creating Roles
 */

export const createRoles =  async ()=>{
    try {
        // Figure out and count if roles exit or not
        const rolesCounter = await Role.estimatedDocumentCount();

        if(rolesCounter > 0) return;

        //Creating: ["admin","user"]
        const roles_by_default = await Promise.all([
            new Role({name:"admin"}).save(),
            new Role({name:"user"}).save(),
        ]);
        console.log("All Roles were Created".bgGreen,roles_by_default);
    } catch (error) {
        const title = "Internal Error\nRoles ctrl: CreateRoles";
        const message = `ErrorMessage: ${error}`;
        handleErrorServer(title,message);
    }
}

