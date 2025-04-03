import { test,expect } from "@playwright/test";
import { LoginPage } from "../../pages/loginpage";
import { AccountsOverviewPage } from "../../pages/accountsoverview";
import userData from "../../utils/userData.json"
import savingsAccount from "../../utils/savingsAccount.json";

test.describe("Parabank Savings Account Transactions Validation", () => {
    let page:any;
    let context:any;
    let loginPage: LoginPage;
    let accountsOverviewPage: AccountsOverviewPage;
    
    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage();
        loginPage = new LoginPage(page);
    
    });
    test.beforeEach(async () => {
        
        accountsOverviewPage = new AccountsOverviewPage(page);

        await loginPage.navigateToLoginPage();
        await loginPage.login(userData);
        await loginPage.validateLoginSuccess();
    });

    test("Verify transactions in Savings Account", async () => {
        await accountsOverviewPage.navigateToAccountsOverview();
        await accountsOverviewPage.selectAccount(savingsAccount.accountNumber);
        await accountsOverviewPage.validateAccountDetailsAfterTransfer(savingsAccount.accountNumber);

        await accountsOverviewPage.transactionCount();

        
         await accountsOverviewPage.validateBalanceAmount();
        
        const isFound= await accountsOverviewPage.validateTransactionDetails("10");
        expect(isFound).toBeTruthy();
        await accountsOverviewPage.validateTransactionDetails("25");
        expect(isFound).toBeTruthy();
    });
    
    test.afterAll(async () => {
        if(await page.isVisible('text=Log Out')){
            await page.getByRole('link',{name:'Log Out'}).click();
        }
        await page.close();
        await context.close();
    });
});
