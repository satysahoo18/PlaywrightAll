
Feature: Error Validation for Login Page
 #npx cucumber-js --exit 
 #here Scenario is world so this keyword will work
 #hooks are setup files and teardown files
 # In npx cucumber-js --tags @ErrorValidation --exit '' is not required for @ErrorValidation as cmd will automatically verify the @symbol 
 # "cucumberTest":"npx cucumber-js --tags @ErrorValidation --exit"

 #npx cucumber-js --tags "@ErrorValidation or @foo" --exit will execute the scenario with either errorvalidation tag or foo tage
 
 #npx cucumber-js --tags "@ErrorValidation and @foo" will execute the scenario which has both tags

@ErrorValidation
Scenario Outline: Login with incorrect password
  Given user enters wrong username "<username>" password and "<password>",
  Then user verify the error message "message"
  Examples:
  #will run two times
  |username | password| message|
  |admin |admin12| Invalid credentials|
  |admin |admin12| Invalid credentials|

