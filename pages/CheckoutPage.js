class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.form = page.locator("#shippingForm");
    this.phoneInput = page.locator("#phone");
    this.streetInput = page.locator('[name="street"]');
    this.cityInput = page.locator('[name="city"]');
    this.countrySelect = page.locator("#countries_dropdown_menu");
    this.submitOrderButton = page.locator("#submitOrderBtn");
    this.shippingDetailsHeading = page.getByRole("heading", { name: "Shipping Details" });
    this.successMessage = page.locator("#message");
  }

  async waitForPage() {
    await this.shippingDetailsHeading.waitFor({ state: "visible" });
    await this.form.waitFor({ state: "visible" });
    await this.submitOrderButton.waitFor({ state: "visible" });
  }

  async fillAllRequiredShippingDetails() {
    await this.fillRequiredShippingDetails("5876 Little Streets", "Bangkok", "Thailand");
  }

  async fillRequiredShippingDetails(street, city, country) {
    await this.phoneInput.fill("0812345678");
    await this.streetInput.fill(street);
    await this.cityInput.fill(city);
    await this.countrySelect.selectOption({ label: country });
  }

  async fillShippingDetailsWithMissingRequiredFields() {
    await this.phoneInput.fill("0812345678");
    await this.streetInput.fill("");
    await this.cityInput.fill("Bangkok");
    await this.countrySelect.selectOption("Thailand");
  }

  async submitOrder() {
    await this.submitOrderButton.click();
  }

  async isOrderSubmittedSuccessfully() {
    await this.successMessage.waitFor({ state: "visible" });
    const message = await this.getSuccessMessage();
    return message.includes("Congrats! Your order of") && message.includes("has been registered");
  }

  async getSuccessMessage() {
    await this.successMessage.waitFor({ state: "visible" });
    return this.successMessage.innerText();
  }

  async isAddressDisplayedAs(expectedAddress) {
    const message = await this.getSuccessMessage();
    return message.includes(expectedAddress);
  }

  async isOrderNotSubmitted() {
    const invalidFields = await this.form.evaluate((form) => {
      return Array.from(form.querySelectorAll("input, select"))
        .filter((field) => !field.checkValidity())
        .map((field) => ({
          name: field.getAttribute("name"),
          id: field.id,
          message: field.validationMessage
        }));
    });

    await this.form.waitFor({ state: "visible" });
    return invalidFields.length > 0 && invalidFields.some((field) => field.message.length > 0);
  }
}

module.exports = { CheckoutPage };
