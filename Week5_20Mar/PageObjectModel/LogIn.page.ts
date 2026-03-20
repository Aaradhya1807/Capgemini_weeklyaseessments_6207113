import { Page, expect } from '@playwright/test';
import path from "path";
import logindata from "../Utility/Login.json";
class Login{
    page:Page
    data:any
    loginBTN:any
    Email:any
    Password:any
    SignIn:any
    constructor(page:Page){
        this.page=page;
        this.data=logindata;
        this.loginBTN=page.locator('//a[@id="customer_login_link" and .="Log In"]')
        this.Email=page.locator('//input[@id="customer_email"]')
        this.Password=page.locator('//input[@id="customer_password"]')
        this.SignIn=page.locator('//input[@value="Sign In"]')

    }
    async navigate(){
        await this.page.goto(this.data.url)
    }

    async login(){
        await this.loginBTN.click()
        await this.Email.fill(this.data.mail)
        await this.Password.fill(this.data.Pass)
        await this.SignIn.click()
        // await this.page.waitForTimeout(3000)
    }

}
export default Login;