import { test } from "@playwright/test";
import { RegistrationPage } from "../../pages/registrationpage";
import userData from "../../utils/userData.json"

let page: any;
let context:any;
let registrationPage: RegistrationPage;


test.describe("Registration Page", () => {
  test.use({ storageState: undefined }); // Ensures a fresh session every time


  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    registrationPage = new RegistrationPage(page);
    });
    
  
  
     test.beforeEach(async () => {
     await page.goto("https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC");
     await page.context().clearCookies();
     await page.context().clearPermissions();
     await page.evaluate(()=> localStorage.clear());
     });

test('should register a new user', async () => {
        
  
        await registrationPage.goto();
        await registrationPage.fillRegisterForm(userData);
        await registrationPage.submitForm();
        await registrationPage.validateRegistrationSuccess();
        //await registrationPage.logout();
         
       });

       test.afterAll(async () => {
        await page.close();
        await context.close();
      });
     });

