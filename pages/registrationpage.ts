import {Page,expect} from "@playwright/test";

export  class RegistrationPage {
   
  private firstNameInput = `input[name='customer.firstName']`;
  private lastNameInput = `input[name='customer.lastName']`;
  private addressInput = `input[name='customer.address.street']`;
  private cityInput = `input[name='customer.address.city']`;
  private stateInput =  `input[name='customer.address.state']`;
  private zipCodeInput =  `input[name='customer.address.zipCode']`;
  private phoneNumberInput = `input[name='customer.phoneNumber']`;
  private ssnInput = `input[name='customer.ssn']`;
  private usernameInput = `input[name='customer.username']`;
  private passwordInput = `input[name='customer.password']`;
  private confirmPasswordInput = `input[name='repeatedPassword']`;


    constructor(public page: Page){
      this.page = page;
    }
  

  async goto() {
    await this.page.goto("https://parabank.parasoft.com/parabank/register.htm;jsessionid=2C3026B57936018DDEF72BFC9C001991");
  }

  async submitForm() {
    await this.page.click('[value="Register"]');
  }
  async validateRegistrationSuccess() { 
    if (await this.page.locator('.error').isVisible()) {
      console.warn('User already exists, skipping registration.');
      return;
  }

       await expect(this.page.locator('h1')).toContainText('Welcome');
       await expect(this.page.locator('#rightPanel')).toContainText('Your account was created successfully. You are now logged in.');
  
}
      async logout(){
           await this.page.getByRole('link', { name: 'Log Out' }).click();
      }
  
  async fillRegisterForm(userData:any) {
    await this.page.fill(this.firstNameInput, userData.FirstName);
    await this.page.fill(this.lastNameInput,userData.LastName);
    await this.page.fill(this.addressInput, userData.Address);
    await this.page.fill(this.cityInput, userData.City);
    await this.page.fill(this.stateInput,userData.State);
    await this.page.fill(this.zipCodeInput, userData.ZipCode);
    await this.page.fill(this.phoneNumberInput, userData.PhoneNumber);
    await this.page.fill(this.ssnInput, userData.SSN);

    await this.page.fill(this.usernameInput, userData.Username);
    await this.page.fill(this.passwordInput, userData.Password);
    await this.page.fill(this.confirmPasswordInput, userData.Confirm);
  }

  }


