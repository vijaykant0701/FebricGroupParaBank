Feature: Transaction API
  As a banking system
  I want to provide transaction APIs
  So that users can manage their transactions

  Background:
    Given I have made payment transactions with the following details:
      | accountType | payeeName   | amount  | description       |
      | SAVINGS     | Test Payee  | 100.00  | Initial payment   |
      | CHECKING    | ACME Corp   | 250.00  | Service payment   |
      | SAVINGS     | Utility Co  | 75.50   | Monthly bill      |

  Scenario Outline: Find transactions by amount
    When I search for transactions by amount <amount> for account type <accountType>
    Then the API should return status code <statusCode>
    And the response should contain transaction with amount <amount>
    And the response should contain description "<description>"

    Examples:
      | accountType | amount  | statusCode | description       |
      | SAVINGS     | 100.00  | 200        | Initial payment   |
      | CHECKING    | 250.00  | 200        | Service payment   |
      | SAVINGS     | 75.50   | 200        | Monthly bill      |
      | CHECKING    | 999.99  | 404        |                   |

  Scenario Outline: Validate transaction response structure
    When I search for transactions by amount <amount> for account type <accountType>
    Then the response should match JSON schema:
      """
      {
        "type": "object",
        "properties": {
          "transactions": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "id": { "type": "string" },
                "amount": { "type": "string" },
                "description": { "type": "string" },
                "date": { "type": "string" }
              },
              "required": ["id", "amount", "date"]
            }
          }
        },
        "required": ["transactions"]
      }
      """

    Examples:
      | accountType | amount  |
      | SAVINGS     | 100.00  |
      | CHECKING    | 250.00  |