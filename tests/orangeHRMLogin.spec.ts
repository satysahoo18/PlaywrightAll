// Generated using AI Agent
import { expect, test } from "@playwright/test";
import { OrangeHRMDashboardPage } from "../PageObjectsTS/OrangeHRMDashboardPage";
import { OrangeHRMLoginPage } from "../PageObjectsTS/OrangeHRMLoginPage";

test("Admin can log in and land on the OrangeHRM dashboard", async ({
  page,
}) => {
  const loginPage = new OrangeHRMLoginPage(page);
  const dashboardPage = new OrangeHRMDashboardPage(page);

  await loginPage.goto();
  await loginPage.login("Admin", "admin123");

  await expect(page).toHaveURL(
    "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index",
  );
  await expect(dashboardPage.heading).toBeVisible();
  await expect(dashboardPage.isAtDashboard()).resolves.toBe(true);
});
