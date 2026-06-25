class LoginPage {
  constructor(page) {
    this.page = page;
    this.url = "https://qa-practice.razvanvancea.ro/auth_ecommerce.html";
    this.emailInput = page.locator("#email");
    this.passwordInput = page.locator("#password");
    this.submitButton = page.locator("#submitLoginBtn");
    this.loginHeading = page.getByRole("heading", { name: "Login - Shop" });
    this.shopHeading = page.getByRole("heading", { name: "SHOPPING CART" });
    this.checkoutButton = page.getByRole("button", { name: "PROCEED TO CHECKOUT" });
  }

  async open() {
    await this.page.goto(this.url, { waitUntil: "domcontentloaded" });
    await this.submitButton.waitFor({ state: "visible" });
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async isShopPageVisible() {
    await this.shopHeading.waitFor({ state: "visible" });
    await this.checkoutButton.waitFor({ state: "visible" });
    return true;
  }

  async isLoginPageVisible() {
    await this.submitButton.waitFor({ state: "visible" });
    return (await this.loginHeading.isVisible()) && (await this.submitButton.isVisible());
  }
}

module.exports = { LoginPage };
