// // @ts-check
// import { test, expect } from '@playwright/test';

// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });

// test('get started link', async ({ page }) => {
//   await page.goto('/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });



// let scores = 70
// ;

// if (scores >= 90 && scores <= 100){
//   console.log("відмінно")
// } else if (scores >= 70 && scores <= 89){
//   console.log("добре")
// } else if(scores >= 50 && scores <= 69) {
//   console.log("задовільно")
// } else {
//   console.log("незадовільно")
// }

let action = "поділити"
let num1 = 2;
let num2 = 3;
switch (action) {
  case "додати":
    console.log(num1 + num2);
    break;
  case "відняти":
    console.log(num1 - num2);
    break;
  case "помножити":
    console.log(num1 * num2);
    break;
  case "поділити":
    console.log(num1 / num2);
    break;
  default:
    console.log("Невідома дія");
}

// У вас є число.Використовуйте тернарний оператор 
// для перевірки числа на парність.Виведіть "парне", якщо число парне, 
// і "непарне" в іншому випадку.

let number = 6;


(number % 2 === 0) ? console.log("парне") : console.log("непарне");