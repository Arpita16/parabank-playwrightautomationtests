import { Page,expect} from "@playwright/test";




export class UpdateContactInfoPage {

    constructor(public page: Page){
        this.page = page;
    }

    async gotoUpdateProfile(){
        await this.page.getByRole('link',{name:'Update Contact Info'}).click();
    }

    async updateContactInfo(newPhone: string) {
        await this.page.fill('[id="customer.phoneNumber"]', newPhone);
    }
    async clickUpdateProfile(){
        await this.page.getByRole('button',{name:"Update Profile"}).click(); 
    }

    async validateUpdateSuccess() {
        const successMessage= this.page.locator('#updateProfileResult')
        await expect(successMessage).toContainText('Profile Updated');
    }
    async logout(){
        await this.page.getByRole('link', { name: 'Log Out' }).click();
    }
         
    }
