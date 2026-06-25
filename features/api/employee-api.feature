@api
Feature: Employee API

  Scenario: Create employee successfully
    When I create a valid employee via API
    Then the API response status should be 201

  Scenario: Cannot create employee with invalid email
    When I create an employee with invalid email "invalid-email"
    Then the API response status should be 400
    And the API validation defaultMessage should be "must be a well-formed email address"

  Scenario: Get existing employee by id
    Given I have an existing employee id
    When I request the employee by the existing id
    Then the API response status should be 200
    And the API response should contain the existing employee id

  Scenario: Get employee by non existing id
    When I request the employee by id 999999
    Then the API response status should be 404
    And the API response message should be "Employee not found with ID 999999"
