import { todo } from "node:test";
import { PageHolder } from "./abstractClasses";
import GaragePage from "./pages/garage.page";
import HomePage from "./pages/home.page";



export class Application extends PageHolder {
    //POM
    public garagePage = new GaragePage(this.page);
    public homePage = new HomePage(this.page);



    //API

    async setToken() {
        //todo
        await console.log("set token");
        // to use async await for methods
    }
}






