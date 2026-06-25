const { setWorldConstructor } = require("@cucumber/cucumber");

class CustomWorld {
  constructor() {
    this.apiBaseUrl = "";
    this.apiResponse = null;
    this.employeeApi = null;
    this.employeePayload = null;
    this.employeeId = null;
    this.browser = null;
    this.context = null;
    this.page = null;
  }
}

setWorldConstructor(CustomWorld);
