import { todo } from "node:test";
import { PageHolder } from "./abstractClasses";
import GaragePage from "./pages/garage.page";
import HomePage from "./pages/home.page";
import RestoreAccessForm from "./components/restoreAccessForm.components"
import SignInForm from "./components/signInForm.components";
import SignUpForm from "./components/signUpForm.components";
import AddCarComponent from "./components/addCar.components";


export class Application extends PageHolder {
    //POM
    public garagePage = new GaragePage(this.page);
    public homePage = new HomePage(this.page);
    // public restoreAccessForm = new RestoreAccessForm(this.page, this.page.locator('div.modal__container'));
    // public signInForm = new SignInForm(this.page);
    // public signUpForm = new SignUpForm(this.page, this.page.locator('div.modal__container'));
    // replace to pages like signInComponent in HomePage


    //API

    async setToken() {
        //todo
        await console.log("set token");
        // to use async await for methods
    }
}






