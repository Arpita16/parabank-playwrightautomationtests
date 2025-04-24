import { Page ,expect} from '@playwright/test';
import { writeFileSync } from 'fs';



export class LoginPage {

  private usernameInput = `input[name='username']`;
  private passwordInput = `input[name='password']`;

    constructor(public page: Page){
        this.page = page;
        
    }
    async navigateToLoginPage(){
        await this.page.goto('https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC')
    }

    async login(userData:any) {
        await this.page.fill(this.usernameInput,userData.Username);
        await this.page.fill(this.passwordInput,userData.Password);

        await this.page.getByRole('button',{name:"Log In"}).click();  
     
    }
    async validateLoginSuccess(){
              
             const successMessage= this.page.getByRole('heading', { name: 'Accounts Overview' });
             await expect(successMessage).toContainText('Accounts Overview');
       }
    
  async captureCheckingAccountNumber() {
    
    await this.page.waitForSelector('//table/tbody/tr[1]/td[1]/a');  
    const accountNumber = await this.page.locator('//table/tbody/tr[1]/td[1]/a').textContent();
    const accountData = {
    accountNumber: accountNumber
  };

  writeFileSync('D:\\Parabank-PlaywrightTests\\utils\\checkingAccount.json', JSON.stringify(accountData));


  expect(accountNumber).toBeDefined();

}

}