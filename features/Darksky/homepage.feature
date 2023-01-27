Feature: Time Machine

    Scenario: Verify current date is highlighted in Time Machine
        Given I am on darksky
        When I click on Time Machine button
        Then I verify current date is highlighted