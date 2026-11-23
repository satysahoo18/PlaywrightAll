
Feature: E2E Ecommerce Validation
 #npx cucumber-js --exit 
 #here Scenario is world so this keyword will work
 #hooks are setup files and teardown files
 # In npx cucumber-js --tags @ErrorValidation --exit '' is not required for @ErrorValidation as cmd will automatically verify the @symbol 
 #  "cucumberTest":"npx cucumber-js --tags @ErrorValidation --exit"
 # npx cucumber-js --tags "@regression" --parallel 2 --exit >> parallel 2 if scenarios 2
 #npx cucumber-js --tags "@regression" --parallel 2 --format html:cucumber-report.html --retry 1 --exit >> retry 1 for 1 retry on failing
 @regression
 @foo
 Scenario Outline: Scenario Outline name: E2E ecommerce flow   
   Given the user is on login page and logs in using "<username>" and "<password>"
   When user lands on dashboard page and add "<product>" to the cart
   Then Verify if the "<product>" is added to the cart 
   And user selects country "India" and  Place the order 
   Then verify the order present in the order page

   Examples:
    Examples:
  #will run two times
  |username | password| product|
  |satyabratasahoo981@gmail.com |satya1996| ADIDAS ORIGINAL|


  @regression
 @foo
 Scenario Outline: Scenario Outline name: E2E ecommerce flow   
   Given the user is on login page and logs in using "<username>" and "<password>"
   When user lands on dashboard page and add "<product>" to the cart
   Then Verify if the "<product>" is added to the cart 
   And user selects country "India" and  Place the order 
   Then verify the order present in the order page

   Examples:
    Examples:
  #will run two times
  |username | password| product|
  |satyabratasahoo981@gmail.com |satya1996| ZARA COAT 3|
