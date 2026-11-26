const { test } = require('@playwright/test');

import { expect } from '@playwright/test';

test('Validate Radio Buttons and Static Dropdown', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await page.locator("select[data-style='btn-info']").selectOption('Consultant');

    // to check the radio or checkbox 
    // click() method can also be used to check the radio or checkbox, 
    // but it will not work if the element is hidden, 
    // so we can use check() method which will work even if the element is hidden.

    await page.locator(".checkmark").last().check(); 
    await page.locator("#okayBtn").click();
    //assertion for check
    await expect(page.locator(".checkmark").last()).toBeChecked();
    console.log(await page.locator(".checkmark").last().isChecked());

    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    console.log(await page.locator("#terms").isChecked());

    //to uncheck the checkbox
    await page.locator("#terms").uncheck() ;
    await expect(page.locator("#terms")).not.toBeChecked(); 
    expect(await page.locator("#terms").isChecked()).toBeFalsy();

    //assertion for attribute
    await expect(page.locator("a[href*='documents-request']")).toHaveAttribute('class', 'blinkingText');
    

});

test('Child Windows test', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    // promise status is pending,rejected or fulfilled,
    const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    page.locator("a[href*='documents-request']").click()
    ])

    // const text = await newPage.locator(".red").textContent();
    // console.log(text.split("@")[1].split(" ")[0]);
    
        
    console.log((await newPage.locator(".red").textContent()).split("@")[1].split(" ")[0]);
});
