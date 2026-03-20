import { Page, expect } from '@playwright/test';
import path from "path";
import signUpdata from "../Utility/Signup.json";
class Signup{
    page:Page
    data:any
    signupBTN:any
    Firstname:any
    Lastname:any
    Email:any
    Password:any
    Create:any
    constructor(page:Page){
        this.page=page;
        this.data=signUpdata;
        this.signupBTN=page.locator('//a[@id="customer_register_link" and .="Sign up"]')
        this.Firstname=page.locator('//input[@id="first_name"]')
        this.Lastname=page.locator('//input[@id="last_name"]')
        this.Email=page.locator('//input[@id="email"]')
        this.Password=page.locator('//input[@id="password"]')
        this.Create=page.locator('//input[@value="Create"]')

    }
    async navigate(){
        await this.page.goto(this.data.url)
    }

    async signup(){
        await this.signupBTN.click()
        await this.Firstname.fill(this.data.Fname)
        await this.Lastname.fill(this.data.Lname)
        await this.Email.fill(this.data.mail)
        await this.Password.fill(this.data.Pass)
        await this.Create.click()
    }

}
export default Signup;