import type { Locator, Page } from "@playwright/test";
export abstract class PageHolder {
    abstract expectLoaded(): Promise<void>
    constructor(public page: Page) { }
}

export abstract class Component extends PageHolder {
    public container: Locator;

    constructor(page: Page, container: Locator) {
        super(page)
        this.container = container;
    }
}

export abstract class AppPage extends PageHolder {
    public abstract pagePath: string;

    async open(path?: string) {
        await this.page.goto(path ?? this.pagePath);
        await this.expectLoaded()
    }
}