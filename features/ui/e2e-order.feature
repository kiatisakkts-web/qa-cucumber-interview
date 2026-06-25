@ui @e2e
Feature: Ecommerce end-to-end order

  Scenario: Complete ecommerce order from login to address validation
    Given I open the ecommerce login page
    When I login with email "admin@admin.com" and password "admin123"
    Then I should see the shop page
    When I select "Dior J'adore" with quantity 2
    And I select "Gucci Bloom Eau de" with quantity 3
    Then the total price should be calculated correctly
    When I proceed to checkout
    Then I should see the shopping details page
    When I fill all required shipping details with street "123 Sukhumvit Road" city "Bangkok" and country "Thailand"
    And I submit the order
    Then the address should be displayed as "123 Sukhumvit Road, Bangkok - Thailand"
