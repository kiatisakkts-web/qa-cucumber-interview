@ui @checkout
Feature: Ecommerce checkout

  Scenario: Submit order successfully with all required shipping details
    Given I am on the shopping details page with selected items
    When I fill all required shipping details
    And I submit the order
    Then the order should be submitted successfully

  Scenario: Cannot submit order when required shipping details are missing
    Given I am on the shopping details page with selected items
    When I fill shipping details with some required fields missing
    And I try to submit the order
    Then the order should not be submitted

  @address
  Scenario: Validate address is displayed in correct format after order submission
    Given I am on the shopping details page with selected items
    When I fill all required shipping details with street "123 Sukhumvit Road" city "Bangkok" and country "Thailand"
    And I submit the order
    Then the address should be displayed as "123 Sukhumvit Road, Bangkok - Thailand"
