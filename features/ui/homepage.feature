@ui
Feature: Sample UI smoke test

  Scenario: Visitor can see the starter page
    Given I open the sample UI page
    Then I should see the page title "QA Cucumber Interview"
