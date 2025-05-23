import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/loginpage";
import { TransferFundsPage } from "../../pages/transferfunds";
import userDataJson from "../../utils/userData.json";
import checkingAccount from "../../utils/checkingAccount.json";
import savingsAccount from "../../utils/savingsAccount.json";

test.describe("Parabank Transfer Funds Tests", () => {
    
    let loginPage: LoginPage;
    let transferFundsPage: TransferFundsPage;
    
    let page: any;
    let context:any;

    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage();
        loginPage = new LoginPage(page);

        await loginPage.navigateToLoginPage();
        await loginPage.login(userDataJson);
        await loginPage.validateLoginSuccess();
       
    });

    test.beforeEach(async () => {
      transferFundsPage = new TransferFundsPage(page);

        
    });

    test("Transfer $10 from Savings to Checking", async () => {
        await transferFundsPage.navigateToTransferFunds();
        await transferFundsPage.transferFunds("10", savingsAccount.accountNumber, checkingAccount.accountNumber);
        await transferFundsPage.validateTransferSuccess();
    });

    test("Transfer $25 from Savings to Checking", async () => {
        await transferFundsPage.navigateToTransferFunds();
        await transferFundsPage.transferFunds("25", savingsAccount.accountNumber, checkingAccount.accountNumber);
        await transferFundsPage.validateTransferSuccess();
    });

    test.afterAll(async () => {
        await page.close();
        await context.close();
    });
});
