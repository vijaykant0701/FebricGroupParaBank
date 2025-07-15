Feature: Global Navigation
  As a ParaBank user
  I want to navigate through the application
  So that I can access all banking features

  Background:
    Given I am logged in as a registered user

  Scenario Outline: Verify navigation menu items
    When I click on the "<menuItem>" in the global navigation
    Then I should be redirected to the "<expectedPage>" page
    And the page title should contain "<expectedTitle>"

    Examples:
      | menuItem          | expectedPage          | expectedTitle                 |
      | Open New Account  | Open New Account      | Open New Account              |
      | Accounts Overview | Accounts Overview     | Accounts Overview             |
      | Transfer Funds    | Transfer Funds        | Transfer Funds                |
      | Bill Pay          | Bill Pay              | Bill Pay Service              |
      | Find Transactions | Find Transactions     | Find Transactions             |
      | Update Contact    | Update Profile        | Profile Updated               |
      | Request Loan      | Request Loan          | Apply for a Loan              |
    
  Scenario Outline: Verify quick access links
    When I click on the "<linkText>" quick link
    Then I should be redirected to the "<expectedPage>" page
    And the page title should contain "<expectedTitle>"

    Examples:
      | linkText          | expectedPage          | expectedTitle                 |
      | ATM Services      | Services              | Available Bookstore Services  |
      | Withdraw Funds    | Withdraw Funds        | Withdraw Funds                |
      | Transfer Funds    | Transfer Funds        | Transfer Funds                |
      | Check Balances    | Accounts Overview     | Accounts Overview             |
      | Make Deposits     | Deposit Funds         | Deposit Funds                 |
      | Pay Bills         | Bill Pay              | Bill Pay Service              |