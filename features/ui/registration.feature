@registration
Feature: User Registration
  As a new user
  I want to register on ParaBank
  So that I can access banking services

  Scenario: Successful user registration with random data
  Given I navigate to ParaBank registration page
  When I fill in registration form with random details
  And I submit the registration form
  Then I should be logged in with same user

Scenario Outline: Successful user registration with specific data
  Given I navigate to ParaBank registration page
  When I fill in registration form with these details:
    | firstName | lastName | address | city   | state | zipCode | phone      | ssn | password | confirmPassword |
    | vijay     | Mishra   | Bhopal  | Bhopal | MP    | 402039  | 9090909090 | 121 | Test@123 | Test@123        |

  Then I should be logged in with same user
  And I submit the registration form
  Then I have the following accounts:
    
  
    
      
