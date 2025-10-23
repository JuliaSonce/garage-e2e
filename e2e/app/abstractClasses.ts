import type { Locator, Page } from "@playwright/test";
export abstract class PageHolder {
    constructor(public page: Page) { }
}

export abstract class Component extends PageHolder {
    abstract expectLoaded(): Promise<void>
    public container: Locator;

    constructor(page: Page, container: Locator) {
        super(page)
        this.container = container;
    }

    async isVisible(): Promise<boolean> {
        return await this.container.isVisible();
    }
}

export abstract class AppPage extends PageHolder {
    abstract expectLoaded(): Promise<void>
    public abstract pagePath: string;

    async open(path?: string) {
        await this.page.goto(path ?? this.pagePath);
        await this.expectLoaded()
    }
}