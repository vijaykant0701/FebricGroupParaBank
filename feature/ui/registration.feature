Feature: User Registration
  As a new user
  I want to register on ParaBank
  So that I can access banking services

  Scenario: Successful user registration with random data
    Given I navigate to ParaBank registration page
    When I fill in registration form with random unique details
    And I submit the registration form
    Then I should see the welcome message
    And I should be logged in

  Scenario Outline: Successful user registration with specific data
    Given I navigate to ParaBank registration page
    When I fill in registration form with following details:
      | firstName | lastName | address       | city     | state | zipCode | phone       | ssn         | password | confirmPassword |
      | <firstName> | <lastName> | <address> | <city> | <state> | <zipCode> | <phone> | <ssn> | <password> | <confirmPassword> |
    And I submit the registration form
    Then I should see the welcome message
    And I should be logged in

    Examples:
      | firstName | lastName | address       | city     | state | zipCode | phone       | ssn         | password | confirmPassword |
      | John      | Doe      | 123 Main St   | Anytown  | CA    | 12345   | 555-123-4567 | 123-45-6789 | password | password        |
      | Jane      | Smith    | 456 Oak Ave   | Othertown| NY    | 54321   | 555-987-6543 | 987-65-4321 | secure123| secure123       |