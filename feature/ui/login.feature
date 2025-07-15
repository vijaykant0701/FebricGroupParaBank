Feature: User Login
  As a ParaBank user
  I want to login to my account
  So that I can access my banking services

  Scenario: Successful login with valid credentials
    Given I am on the login page
    When I login with username "john" and password "demo"
    Then I should be logged in

  Scenario Outline: Login with different credentials
    Given I am on the login page
    When I login with username "<username>" and password "<password>"
    Then I should be logged in

    Examples:
      | username | password |
      | john     | demo     |
      | admin    | admin123 |
      | user1    | password1|

  Scenario: Failed login with invalid credentials
    Given I am on the login page
    When I login with username "invalid" and password "wrongpassword"
    Then I should not be logged in