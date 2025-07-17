
Feature: Account Operations
  As a ParaBank customer
  I want to manage my accounts
  So that I can control my finances

#   Background:
#     Given I am logged in as user "john" with password "demo"

  @accounts @setup
  # Scenario: Create new accounts
  #   Given I have the following accounts:
  #     | accountType | initialBalance |
  #     | SAVINGS    | 1000.00        |
  #     | CHECKING   | 500.00         |

  @transfer @money
  Scenario: Transfer funds between accounts
    Given I have the following accounts:
      | accountType | initialBalance |
      | SAVINGS    | 1000.00        |
      | CHECKING   | 500.00         |
    When I transfer "200.00" from "SAVINGS" to "CHECKING"
    Then the "SAVINGS" balance should be "800.00"
    And the "CHECKING" balance should be "700.00"

  @bills @payment
  Scenario: Pay a bill
    Given I have the following accounts:
      | accountType | initialBalance |
      | CHECKING   | 1000.00        |
    When I pay bill with following details:
      | fromAccountType | payeeName     | amount  | description          |
      | CHECKING       | Electric Co.  | 150.00  | Monthly electricity |
    Then the "CHECKING" balance should be "850.00"

  @transfer @data-driven
  Scenario Outline: Transfer different amounts
    Given I have the following accounts:
      | accountType | initialBalance |
      | SAVINGS    | 1000.00        |
      | CHECKING   | 500.00         |
    When I transfer "<amount>" from "<from>" to "<to>"
    Then the "<from>" balance should be "<fromBalance>"
    And the "<to>" balance should be "<toBalance>"

    Examples:
      | amount | from     | to       | fromBalance | toBalance |
      | 100.00 | SAVINGS  | CHECKING | 900.00      | 600.00    |
      | 50.00  | CHECKING | SAVINGS  | 450.00      | 1050.00   |
      | 200.00 | SAVINGS  | CHECKING | 800.00      | 700.00    |