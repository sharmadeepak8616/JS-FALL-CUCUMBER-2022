Feature: Login
    # comment
    # Scenario: Verify error for invalid login
    #     Given I am on facebook
    #     When I type '#$%^&*' as username
    #     And I type 'abcd@1234' as password
    #     And I click login button
    #     Then I verify error is displayed

    Scenario: Verify login fields are enabled
        Given I am on facebook
        Then I verify login email is enabled
        And I verify login password is enabled
        And I verify login button is enabled