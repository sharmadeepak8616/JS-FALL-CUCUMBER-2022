Feature: Code Test

    @codeTest @codeTest-1
    Scenario Outline: Verify user is able to change language
        Given I am on hotels
        When I change langugage to <languageOption>
        Then I verify language got changed to <language>

        Examples:
            | languageOption           | language |
            | Español (Estados Unidos) | Español  |
            | English (United States)  | English  |

    @codeTest @codeTest-2
    Scenario: Verify number of adults count in a room
        Given I am on hotels
        When I select number of adults in Room 1 as 1
        Then I verify the minus button for adults is disabled
        And I verify the plus button for adults is enabled
        When I select number of adults in Room 1 as 14
        Then I verify the plus button for adults is disabled
        And I verify the minus button for adults is enabled

    Scenario Outline: Verify password strength bar and messages
        Given I am on hotels
        And I click on Sign in
        And I click on Sign up
        When I enter user@test.com in Email address
        And I enter fUser in First name
        And I enter lUser in Last name
        And I enter <password> in Password
        Then I verify Password strength bar is <strengthBar> filled
        And I verify Password strength message is <strengthMsg>

    Example:
            | password     | strengthBar | strengthMsg |
            | abcd         | not         | Weak        |
            | abcd@123     | half        | Weak        |
            | abcd@12324   | almost      | Strong      |
            | abcd@12@pl@2 | completely  | Very Strong |

    Scenario Outline: Verify weak password messages
        Given I am on hotels
        And I click on Sign in
        And I click on Sign up
        When I enter user@test.com in Email address
        And I enter fUser in First name
        And I enter lUser in Last name
        And I enter <password> in Password
        And I verify <msg1> message is displayed
        And I verify <msg2> message is displayed

    Example:
            | password | msg1                                | msg2                             |
            | abcd     | Includes 8-64 characters            | Combines letters and numbers     |
            | abcd@123 | Add more words that are less common | Avoid common character sequences |