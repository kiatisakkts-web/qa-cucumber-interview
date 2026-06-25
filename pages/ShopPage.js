class ShopPage {
  constructor(page) {
    this.page = page;
    this.shopHeading = page.getByRole("heading", { name: "SHOPPING CART" });
    this.checkoutButton = page.getByRole("button", { name: "PROCEED TO CHECKOUT" });
    this.cartRows = page.locator(".cart-items .cart-row");
    this.totalPrice = page.locator(".cart-total-price");
    this.shippingDetailsHeading = page.getByRole("heading", { name: "Shipping Details" });
    this.submitOrderButton = page.locator("#submitOrderBtn");
    this.selectedProducts = [];
  }

  async waitForShopPage() {
    await this.shopHeading.waitFor({ state: "visible" });
    await this.checkoutButton.waitFor({ state: "visible" });
    await this.productCard("Dior J'adore").waitFor({ state: "visible" });
  }

  productCard(productName) {
    return this.page.locator(".shop-item").filter({
      has: this.page.locator(".shop-item-title", { hasText: productName })
    });
  }

  cartRow(productName) {
    return this.cartRows.filter({ hasText: productName });
  }

  async selectProduct(productName, quantity) {
    const product = this.productCard(productName);
    await product.waitFor({ state: "visible" });

    const price = this.parsePrice(await product.locator(".shop-item-price").innerText());
    await product.locator(".shop-item-button").click();

    const row = this.cartRow(productName);
    await row.waitFor({ state: "visible" });
    await this.setCartQuantity(row, quantity);

    this.selectedProducts.push({ productName, price, quantity });
  }

  async setCartQuantity(row, quantity) {
    const quantityInput = row.locator(".cart-quantity-input");
    await quantityInput.click();
    await quantityInput.press("Control+A");
    await quantityInput.type(String(quantity));
    await quantityInput.press("Tab");
  }

  getExpectedTotal() {
    const total = this.selectedProducts.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);

    return this.roundToCents(total);
  }

  async getActualTotal() {
    const totalText = await this.totalPrice.innerText();
    return this.parsePrice(totalText);
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
    await this.shippingDetailsHeading.waitFor({ state: "visible" });
  }

  async isShoppingDetailsPageVisible() {
    await this.shippingDetailsHeading.waitFor({ state: "visible" });
    return (await this.submitOrderButton.isVisible()) && (await this.page.locator("#shippingForm").isVisible());
  }

  parsePrice(priceText) {
    return Number(priceText.replace(/[^0-9.]/g, ""));
  }

  roundToCents(value) {
    return Math.round(value * 100) / 100;
  }
}

module.exports = { ShopPage };
