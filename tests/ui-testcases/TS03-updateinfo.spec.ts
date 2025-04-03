import { test} from '@playwright/test';
import { LoginPage } from '../../pages/loginpage';

import userData from "../../utils/userData.json"

import { UpdateContactInfoPage } from '../../pages/updatecontactinfo';

test.describe('User login and Profile Update', () => {
    let page: any;
    let context:any;
    let loginPage:LoginPage;
    let updateContactInfoPage: UpdateContactInfoPage;
   

    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage();
        
        loginPage = new LoginPage(page);
        updateContactInfoPage = new UpdateContactInfoPage(page);
      
    });

    test('User can login and update contact info', async () => {
       
        await loginPage.navigateToLoginPage();

    
        await loginPage.login(userData);

   
        await updateContactInfoPage.gotoUpdateProfile();    
        await updateContactInfoPage.updateContactInfo('77777-7777');
        await updateContactInfoPage.clickUpdateProfile();
        await updateContactInfoPage.validateUpdateSuccess();
        await updateContactInfoPage.logout();
      
    });

    test.afterAll(async () => {
       
        await page.close();
        await context.close();
    });
});
