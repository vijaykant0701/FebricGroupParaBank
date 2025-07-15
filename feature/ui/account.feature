Feature: Account Management
  As a ParaBank customer
  I want to manage my accounts
  So that I can perform banking transactions

  Background:
    Given I am logged in as a registered user
    And I have the following accounts:
      | accountType | initialBalance |
      | SAVINGS     | 1000.00        |
      | CHECKING    | 500.00         |

  Scenario Outline: Create new accounts
    When I open a new "<accountType>" account with initial deposit "<initialDeposit>"
    Then I should see the new "<accountType>" account in accounts overview
    And the account balance should be "<expectedBalance>"

    Examples:
      | accountType | initialDeposit | expectedBalance |
      | SAVINGS     | 1500.00        | 1500.00         |
      | CHECKING    | 750.00         | 750.00          |
      | SAVINGS     | 200.00         | 200.00          |

  Scenario Outline: Transfer funds between accounts
    When I transfer "<amount>" from "<fromAccountType>" to "<toAccountType>"
    Then the "<fromAccountType>" balance should decrease by "<amount>"
    And the "<toAccountType>" balance should increase by "<amount>"

    Examples:
      | amount  | fromAccountType | toAccountType |
      | 100.00  | SAVINGS         | CHECKING      |
      | 50.00   | CHECKING        | SAVINGS       |
      | 250.00  | SAVINGS         | CHECKING      |

  Scenario Outline: Pay bills from account
    When I pay bill with following details:
      | fromAccountType | payeeName | amount  | description       |
      | <fromAccount>   | <payee>   | <amount>| <description>     |
    Then the "<fromAccount>" balance should decrease by "<amount>"
    And the transaction should appear in account activity

    Examples:
      | fromAccount | payee          | amount  | description          |
      | SAVINGS     | Electric Co    | 75.50   | Monthly electricity  |
      | CHECKING    | Internet Provider | 45.00 | Internet bill        |
      | SAVINGS     | Water Company  | 35.25   | Water bill           |

  Scenario Outline: Verify account activity filters
    Given I have performed transactions in my "<accountType>" account
    When I filter account activity by "<filterType>" with value "<filterValue>"
    Then I should see only matching transactions

    Examples:
      | accountType | filterType | filterValue |
      | SAVINGS     | Date Range | This Month  |
      | CHECKING    | Amount     | 100.00      |
      | SAVINGS     | Type       | Debit       |