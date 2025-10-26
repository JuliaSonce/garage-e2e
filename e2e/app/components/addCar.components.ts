import { expect, Locator, Page } from '@playwright/test';
import { Component } from '../abstractClasses';

class Locators {
    constructor(private container: Locator) { }
    brandDropdownField = this.container.locator('select#addCarBrand');
    modelDropdownField = this.container.locator('select#addCarModel');
    mileageInputField = this.container.locator('input#addCarMileage');
    cancelBtn = this.container.locator('.btn.btn-secondary');
    addBtn = this.container.getByRole('button', { name: 'Add' })

}

class Actions {
    constructor(
        private locators: Locators,
    ) { }
    async addCar(car: { brand: any; model: any; }) {
        await this.locators.brandDropdownField.selectOption(car.brand);
        await this.locators.modelDropdownField.selectOption(car.model);
        await this.locators.mileageInputField.click()
        await this.locators.mileageInputField.fill("1001");
        await this.locators.addBtn.click();
    }

}

class Assertions {
    constructor(
        private locators: Locators,
    ) { }
}

export default class AddCarComponent extends Component {
    locators: Locators;
    do: Actions;
    check: Assertions;
    constructor(page: Page) {
        super(page, page.locator('.modal-content'));
        this.locators = new Locators(this.container);
        this.do = new Actions(this.locators);
        this.check = new Assertions(this.locators);
    }
    expectLoaded(): Promise<void> {
        return Promise.resolve();
    }
}