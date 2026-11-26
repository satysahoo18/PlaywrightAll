// Generated using AI Agent
import { Locator, Page } from "@playwright/test";

export class OrangeHRMDashboardPage {
  readonly heading: Locator;

  constructor(private readonly page: Page) {
    this.heading = page.getByRole("heading", { name: "Dashboard" });
  }

  async isAtDashboard(): Promise<boolean> {
    await this.heading.waitFor({ state: "visible" });
/*
    https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
│      │                              │
│      │                              └─ path: the requested page
│      └─ host: the website
└─ scheme: how to connect
https is the secure connection scheme.
opensource-demo.orangehrmlive.com is the website’s host.
/web/index.php/auth/login is the path for OrangeHRM’s login page.
*/
    
    return new URL(this.page.url()).pathname.endsWith("/dashboard/index");
  }
}
