@ui @login
Feature: Ecommerce login

  Scenario: Login success with valid credentials
    Given I open the ecommerce login page
    When I login with email "admin@admin.com" and password "admin123"
    Then I should see the shop page

  Scenario: Login failed with invalid credentials
    Given I open the ecommerce login page
    When I login with email "wrong@test.com" and password "wrong123"
    Then I should stay on the login page
