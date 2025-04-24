# parabank-playwrightautomationtests

## Playwright Testing Project with TypeScript and Page Object Model (POM)

### 📌 Overview

This repository contains an automated testing framework using Playwright with TypeScript, following the Page Object Model (POM) design pattern. 
It enables efficient test automation for web applications with better maintainability and scalability.

This Project contains an E2E testing scripts of an open source Banking website(https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC)) UI testing Framework.

### Test Scenario:

**Flow 1: Registration** 

1. Navigate to https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC

2. Perform a registration,validate registration successful.

3. If the user already exists skip the registration process.(As if a user already exists it's not possible to register again)

4. After successful registration,navigate to Update contact info,validate navigation successfull.

5. Update profile information-phone number,Validate phone number is updated.

6. Logout

**Flow 2: Open Account, create transfer funds and validate**

1. Login using the same user as during the registration process 

2. Navigate to Open New Account,Open a savings account and Validate.

3. Navigate to Accounts Overview,Navigate to the account created and Validate.

4. Navigate to Transfer Funds, Create one transfer of 10$ from the Savings account to the Checking account and verify transfer successful.

5. Create another transfer of 25$ from the Savings account to the Checking account 

6. Navigate to Accounts Overview, Navigate to the Savings account, Validate the two transactions created are shown there.

7. Check the balance amount pattern   

### 🛠️ Tech Stack

- Playwright 🕵️‍♂️ (End-to-end testing)

- TypeScript ⌨️ (Strongly typed JavaScript)

- Jest/Test Runner 🧪 (Test execution)

- Page Object Model (POM) 📄 (Design pattern for better test structure)

📂 **Project Structure**

       📦 parabank-playwrightautomationtests
            ┣ 📂 tests
            ┣ ┣ 📂 ui-testcases
            ┃ ┣ 📜 TS01-registration.spec.ts
            ┃ ┣ 📜 TS02-login.spec.ts
            ┃ ┣ 📜 TS03-updateinfo.spec.ts
            ┃ ┣ 📜 TS04-openaccount.spec.ts
            ┣ ┣ 📜 TS05-accountsoverview.spec.ts
            ┃ ┣ 📜 TS06-transferfunds.spec.ts
            ┃ ┣ 📜 TS07-accountsoverviewaftertransfer.spec.ts
            ┣ 📂 pages
            ┃ ┣ 📜 accountsoverview.ts
            ┃ ┣ 📜 loginpage.ts
            ┃ ┣ 📜 openaccount.ts
            ┃ ┣ 📜 registrationpage.ts
            ┃ ┣ 📜 transferfunds.ts
            ┃ ┣ 📜 updatecontactinfo.ts
            ┣ 📂 utils
            ┃ ┣ 📜 checkingAccount.json
            ┃ ┣ 📜 savingsAccount.json
            ┃ ┣ 📜 userData.json
            ┣ 📜 playwright.config.ts
            ┣ 📜 package.json

### 🚀 Installation & Setup

   **1.Clone the repository**
  
      git clone https://github.com/Arpita16/parabank-playwrightautomationtests.git
      cd parabank-playwrightautomationtests

   **2.Install dependencies**

       npx playwright install
       
   **3.Install Playwright browsers**

        npx playwright install


### 📌  Page Object Model (POM) Implementation

  The Page Object Model (POM) helps in organizing locators and actions for different pages.
  
  **Example** : pages/loginpage.ts

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
              
             const successMessage= await this.page.getByRole('heading',{name:'Accounts Overview'});
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
### 🧪 Writing Tests

  Tests are written using Playwright Test Runner.

 **Example**: tests/ui-tests/login.spec.ts

    import {  test} from '@playwright/test';
    import { LoginPage } from '../../pages/loginpage';
    import userData from "../../utils/userData.json"
    import { AccountsOverviewPage } from '../../pages/accountsoverview';

       test.describe('User Login', () => {
        let page: any;
        let context:any;
        let loginPage: LoginPage;
        let accountOverviewPage:AccountsOverviewPage;

     test.beforeAll(async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage();
        loginPage = new LoginPage(page);
        accountOverviewPage =new AccountsOverviewPage(page);
           });

      test('User can login', async () => {
          
        await loginPage.navigateToLoginPage();
        await loginPage.login(userData);
        await loginPage.validateLoginSuccess();
        await accountOverviewPage.navigateToAccountsOverview();
        await loginPage.captureCheckingAccountNumber();
         });
             
      test.afterAll(async () => {
        await page.close();
        await context.close();
         });
       });

### 🛠 Running Tests

- Run all tests
              
               npx playwright test

- Run tests in headed mode (with UI)
      
               npx playwright test --headed

- Run tests with a specific file
      
               npx playwright test tests/login.spec.ts

### 📊 Test Reporting

- The framework generates an HTML report in **playwright-report/**.
   
- Run the following command to view reports:
    
               npx playwright show-report

### 🛡️ CI/CD Integration
  
  You can integrate Playwright with **GitHub Actions** by adding **.github/workflows/playwright.yml**.

   Example CI/CD workflow:

           name: Playwright Tests
           on: [push, pull_request]
           jobs:
              test:
                 runs-on: ubuntu-latest
                 steps:
                      - name: Checkout Repository
                        uses: actions/checkout@v3
                      - name: Install Dependencies
                        run: npm install
                      - name: Install Playwright Browsers
                        run: npx playwright install
                      - name: Run Tests
                        run: npx playwright test

### 📌 Additional Playwright Commands

- Debug tests
  
        npx playwright test --debug

- Run tests in different browsers

         npx playwright test --browser=firefox




