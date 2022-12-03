Feature: Sign Up

    Scenario: Verify current date is displayed on Sign-Up form
        Given I am on facebook
        When I click on Create New Account
        Then I verify current date is displayed in birthdate dropdown