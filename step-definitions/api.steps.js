const { Given, When, Then } = require("@cucumber/cucumber");
const assert = require("node:assert/strict");

function buildEmployee(overrides = {}) {
  const timestamp = Date.now();

  return {
    firstName: "Api",
    lastName: "Tester",
    dob: "1990-01-01",
    email: `api.tester.${timestamp}@example.com`,
    ...overrides
  };
}

When("I create a valid employee via API", async function () {
  this.employeePayload = buildEmployee();
  this.apiResponse = await this.employeeApi.createEmployee(this.employeePayload);
});

When("I create an employee with invalid email {string}", async function (email) {
  this.employeePayload = buildEmployee({ email });
  this.apiResponse = await this.employeeApi.createEmployee(this.employeePayload);
});

Given("I have an existing employee id", async function () {
  this.employeePayload = buildEmployee();
  const result = await this.employeeApi.createEmployeeAndFindByEmail(this.employeePayload);

  assert.equal(result.createResponse.status, 201);
  assert.equal(result.allEmployeesResponse.status, 200);
  assert.ok(result.createdEmployee, "Expected created employee to be returned by GET /api/v1/employees");

  this.employeeId = result.createdEmployee.id;
});

When("I request the employee by the existing id", async function () {
  this.apiResponse = await this.employeeApi.getEmployeeById(this.employeeId);
});

When("I request the employee by id {int}", async function (id) {
  this.apiResponse = await this.employeeApi.getEmployeeById(id);
});

Then("the API response status should be {int}", function (expectedStatus) {
  assert.equal(this.apiResponse.status, expectedStatus);
});

Then("the API response should contain {string} with value {string}", function (field, expectedValue) {
  assert.equal(this.apiResponse.data[field], expectedValue);
});

Then("the API validation defaultMessage should be {string}", function (expectedMessage) {
  const defaultMessages = this.apiResponse.data.errors.map((error) => error.defaultMessage);
  assert.ok(
    defaultMessages.includes(expectedMessage),
    `Expected defaultMessage "${expectedMessage}" in ${JSON.stringify(defaultMessages)}`
  );
});

Then("the API response should contain the existing employee id", function () {
  assert.equal(this.apiResponse.data.id, this.employeeId);
});

Then("the API response message should be {string}", function (expectedMessage) {
  assert.equal(this.apiResponse.data, expectedMessage);
});
