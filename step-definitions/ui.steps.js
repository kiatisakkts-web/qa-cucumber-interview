const { Given, When, Then } = require("@cucumber/cucumber");
const assert = require("node:assert/strict");
const { HomePage } = require("../pages/home.page");
const { LoginPage } = require("../pages/LoginPage");
const { ShopPage } = require("../pages/ShopPage");
const { CheckoutPage } = require("../pages/CheckoutPage");

Given("I open the sample UI page", async function () {
  this.homePage = new HomePage(this.page);
  await this.homePage.open();
});

Then("I should see the page title {string}", async function (expectedTitle) {
  const actualTitle = await this.homePage.title.textContent();
  assert.equal(actualTitle, expectedTitle);
});

Given("I open the ecommerce login page", async function () {
  this.loginPage = new LoginPage(this.page);
  this.shopPage = new ShopPage(this.page);
  this.checkoutPage = new CheckoutPage(this.page);
  await this.loginPage.open();
});

When("I login with email {string} and password {string}", async function (email, password) {
  this.shopPage = this.shopPage || new ShopPage(this.page);
  await this.loginPage.login(email, password);
});

Then("I should see the shop page", async function () {
  assert.equal(await this.loginPage.isShopPageVisible(), true);
});

Then("I should stay on the login page", async function () {
  assert.equal(await this.loginPage.isLoginPageVisible(), true);
});

Given("I login to the ecommerce shop", async function () {
  this.loginPage = new LoginPage(this.page);
  this.shopPage = new ShopPage(this.page);
  await this.loginPage.open();
  await this.loginPage.login("admin@admin.com", "admin123");
  await this.shopPage.waitForShopPage();
});

When("I select {string} with quantity {int}", async function (productName, quantity) {
  this.shopPage = this.shopPage || new ShopPage(this.page);
  await this.shopPage.selectProduct(productName, quantity);
});

Then("the total price should be calculated correctly", async function () {
  const expectedTotal = this.shopPage.getExpectedTotal();
  const actualTotal = await this.shopPage.getActualTotal();
  assert.equal(actualTotal, expectedTotal);
});

When("I proceed to checkout", async function () {
  this.checkoutPage = this.checkoutPage || new CheckoutPage(this.page);
  await this.shopPage.proceedToCheckout();
});

Then("I should see the shopping details page", async function () {
  this.checkoutPage = this.checkoutPage || new CheckoutPage(this.page);
  assert.equal(await this.shopPage.isShoppingDetailsPageVisible(), true);
});

Given("I am on the shopping details page with selected items", async function () {
  this.loginPage = new LoginPage(this.page);
  this.shopPage = new ShopPage(this.page);
  this.checkoutPage = new CheckoutPage(this.page);

  await this.loginPage.open();
  await this.loginPage.login("admin@admin.com", "admin123");
  await this.shopPage.waitForShopPage();
  await this.shopPage.selectProduct("Dior J'adore", 2);
  await this.shopPage.selectProduct("Gucci Bloom Eau de", 3);
  assert.equal(await this.shopPage.getActualTotal(), this.shopPage.getExpectedTotal());
  await this.shopPage.proceedToCheckout();
  await this.checkoutPage.waitForPage();
});

When("I fill all required shipping details", async function () {
  this.checkoutPage = this.checkoutPage || new CheckoutPage(this.page);
  await this.checkoutPage.fillAllRequiredShippingDetails();
});

When(
  "I fill all required shipping details with street {string} city {string} and country {string}",
  async function (street, city, country) {
    this.checkoutPage = this.checkoutPage || new CheckoutPage(this.page);
    await this.checkoutPage.fillRequiredShippingDetails(street, city, country);
  }
);

When("I fill shipping details with some required fields missing", async function () {
  this.checkoutPage = this.checkoutPage || new CheckoutPage(this.page);
  await this.checkoutPage.fillShippingDetailsWithMissingRequiredFields();
});

When("I submit the order", async function () {
  await this.checkoutPage.submitOrder();
});

When("I try to submit the order", async function () {
  await this.checkoutPage.submitOrder();
});

Then("the order should be submitted successfully", async function () {
  assert.equal(await this.checkoutPage.isOrderSubmittedSuccessfully(), true);
});

Then("the order should not be submitted", async function () {
  assert.equal(await this.checkoutPage.isOrderNotSubmitted(), true);
});

Then("the address should be displayed as {string}", async function (expectedAddress) {
  assert.equal(await this.checkoutPage.isAddressDisplayedAs(expectedAddress), true);
});
