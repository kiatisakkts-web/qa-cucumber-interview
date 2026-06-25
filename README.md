# QA Cucumber Interview Project

This project is a QA Automation test framework created for the `InterviewQA.Test` assignment.

The project uses **Cucumber as the main testing framework** and covers:

- UI Automation Testing for the ecommerce flow
- API Testing for the Employee API
- HTML report generation
- GitHub Actions CI execution

## Tech Stack

- **JavaScript / Node.js**
- **Cucumber.js** for BDD test scenarios
- **Gherkin** for readable test cases
- **Playwright** for UI automation
- **Axios** for API testing
- **cucumber-html-reporter** for HTML report generation
- **Docker** for running the backend API
- **GitHub Actions** for CI automation

## Project Structure

```text
qa-cucumber-interview/
|-- .github/
|   `-- workflows/
|       `-- tests.yml
|-- api/
|   `-- EmployeeApi.js
|-- features/
|   |-- api/
|   |   `-- employee-api.feature
|   `-- ui/
|       |-- login.feature
|       |-- shop.feature
|       |-- checkout.feature
|       `-- e2e-order.feature
|-- pages/
|   |-- LoginPage.js
|   |-- ShopPage.js
|   `-- CheckoutPage.js
|-- scripts/
|   `-- generate-report.js
|-- step-definitions/
|   |-- api.steps.js
|   `-- ui.steps.js
|-- support/
|   |-- apiClient.js
|   |-- hooks.js
|   `-- world.js
|-- cucumber.js
|-- package.json
`-- README.md
```

## Test Scope

The assignment contains two main parts:

1. UI test for the ecommerce website
2. API test for the Employee API

The UI test covers login, product selection, total price validation, checkout details, address validation, and one full end-to-end order flow.

The API test covers positive and negative test cases for creating and retrieving employees.

## UI Test Scenarios

### Login

- Login successfully with valid credentials
- Login failed with invalid credentials

### Product Selection and Cart

- Select `Dior J'adore` with quantity `2`
- Select `Gucci Bloom Eau de` with quantity `3`
- Validate total price by reading product prices from the page and calculating the expected total

### Checkout Details

- Submit order successfully when all required shipping details are filled
- Prevent order submission when required shipping details are missing
- Validate HTML5 form validation for missing required fields

### Address Validation

Validate that the address is displayed in the required format:

```text
Street, City - Country
```

Example:

```text
123 Sukhumvit Road, Bangkok - Thailand
```

### End-to-End Flow

The end-to-end UI scenario covers:

```text
Login
-> Select products
-> Validate total price
-> Proceed to checkout
-> Fill shipping details
-> Submit order
-> Validate address
```

## API Test Scenarios

### POST `/api/v1/employees`

Positive case:

- Create employee successfully
- Expected response status: `201`

Negative case:

- Create employee with invalid email
- Expected response status: `400`
- Validate `defaultMessage`

### GET `/api/v1/employees/{id}`

Positive case:

- Create an employee first
- Retrieve the created employee by ID
- Expected response status: `200`

Negative case:

- Retrieve a non-existing employee ID
- Expected response status: `404`
- Validate response message:

```text
Employee not found with ID {id}
```

## Prerequisites

Before running this project, install:

- Node.js
- npm
- Git
- Docker Desktop
- Google Chrome or Playwright browsers

Check versions:

```bash
node -v
npm -v
git --version
docker --version
```

## Installation

Clone the repository:

```bash
git clone https://github.com/kiatisakkts-web/qa-cucumber-interview.git
cd qa-cucumber-interview
```

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

## Run Backend API with Docker

The API test requires the backend API container.

Run:

```bash
docker run -d --rm --name qa-practice-api -p 8887:8081 rvancea/qa-practice-api:latest
```

Check container:

```bash
docker ps
```

Swagger URL:

```text
http://localhost:8887/swagger-ui.html#/
```

## Run Tests

Run all tests:

```bash
npm test
```

Run UI tests only:

```bash
npm run test:ui
```

Run API tests only:

```bash
npm run test:api
```

Generate HTML report:

```bash
npm run report
```

## Test Report

After running the report command, the HTML report will be generated at:

```text
reports/cucumber-report.html
```

The report includes:

- Feature summary
- Scenario results
- Passed and failed steps
- Execution duration

## GitHub Actions

This project includes GitHub Actions workflow for CI.

Workflow file:

```text
.github/workflows/tests.yml
```

The workflow does the following:

1. Checkout source code
2. Setup Node.js
3. Install dependencies
4. Install Playwright browsers
5. Start the QA Practice API Docker container
6. Wait until the API is ready
7. Run Cucumber tests
8. Generate HTML report
9. Upload the HTML report as an artifact

The latest GitHub Actions run should be green before submitting the project.

## Design Notes

### Why Cucumber?

Cucumber is used as the main framework because it allows test cases to be written in a readable Given / When / Then format.

This makes the test scenarios easier to understand for both technical and non-technical reviewers.

### Why Page Object Pattern?

The UI automation code uses Page Object Pattern to separate page locators and actions from step definitions.

This helps:

- Reduce duplicated code
- Improve maintainability
- Keep step definitions readable
- Make locator updates easier

### Why Axios for API Testing?

Axios is used for API testing because it is simple and clear for HTTP requests.

The API client uses `validateStatus` so that error responses such as `400` and `404` can be validated by the test instead of being thrown immediately as exceptions.

## Interview Explanation

This project uses Cucumber as the main framework. The UI tests are written in Gherkin and automated with Playwright using Page Object Pattern.

For the shopping flow, the test reads product prices from the page, calculates the expected total, and compares it with the actual total displayed in the cart.

For the checkout flow, the test validates both successful order submission and required field validation.

For API testing, the project uses Axios to test both positive and negative cases for the Employee API.

The project also includes an HTML report and GitHub Actions workflow, so the tests can run automatically in CI.
