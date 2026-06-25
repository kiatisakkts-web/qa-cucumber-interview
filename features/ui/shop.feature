@ui @shop
Feature: Ecommerce shop

  Scenario: Select required items and validate total price
    Given I login to the ecommerce shop
    When I select "Dior J'adore" with quantity 2
    And I select "Gucci Bloom Eau de" with quantity 3
    Then the total price should be calculated correctly
    When I proceed to checkout
    Then I should see the shopping details page
