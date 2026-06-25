const { Before, After, setDefaultTimeout } = require("@cucumber/cucumber");
const { chromium } = require("playwright");
const { EmployeeApi } = require("../api/EmployeeApi");

setDefaultTimeout(60 * 1000);

Before({ tags: "@api" }, function () {
  this.apiBaseUrl = process.env.API_BASE_URL || "http://localhost:8887";
  this.employeeApi = new EmployeeApi(this.apiBaseUrl);
});

Before({ tags: "@ui" }, async function () {
  this.browser = await chromium.launch({ headless: true });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
});

After(async function () {
  if (this.context) {
    await this.context.close();
  }

  if (this.browser) {
    await this.browser.close();
  }
});
