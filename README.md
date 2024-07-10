# How to run this
in order to run this on your computer, follow the steps:
1. clone the repo to your local environment
2. run npm install
3. to run UI tests, simply run the command `npm run ui` in your terminal
4. to run API tests, simply run the command `npm run api` in your terminal

# Dropit Automation test

Before you start, notice that the test is about your coding style, readability & architecture. Write it in your favorite language and try to show us what you got. 
Before answering the questions, read all the questions carefully. 
Good luck! 
Dropit team. 


## Part 1 - UI testing 
For this part of the test we are going to use this site 
https://drpt-external-dev.myshopify.com/password to test your UI automation testing skills. 
### 1. Be positive - a positive testing scenario: 
- Go to the site described above 
- Type in the password : “giclao“ and click on “Enter”. 
- Go to the “Catalog” 
- Search for the product : “Dropit Hamburger (QA Automation)” (Do not forget to verify that you got to the right place, use any verification that you like) 
- Add to the cart 2 Medium sized “Dropit Hamburgers” and 1 “So large you can’t eat it” 
- Search for the product : “Dropit Chips (QA Automation)” (Do not forget to verify that you got to the right place, use any verification that you like) - Add to the cart 2 Large sized “Dropit Chips” and 1“Too much for you to handle” 
- Click on the bag icon on the top right hand corner of the page 
- Go to the Check Out section by clicking on the “Check Out” button. - Verify that the Total amount that should be paid is : £56.99 
- Fill in all the information requested in the form as you like (as long as it is valid) 
- Credit card information that should be used in the form: 
- Card number: 1 
- Expiration date 12/26 
- Security code: 777\ 
- Name on card: Bogus Gateway 
- Click on “Pay now” 
- Verify in any way you like that the order is confirmed. 

### 2. Just a bit negative - negative testing scenario: 
- Go to the site described above 
- Type in the password : “giclao“ and click on “Enter”. 
- Go to the “Catalog” 
- Add one Hamburger and one chips to the bag, in any size you like. - Click on the bag icon on the top right hand corner of the page 
- Go to the Check Out section by clicking on the “Check Out” button. - In the Email field add a non-valid input. 
- In the Card Number field add a non-valid input. 
- Verify that the user cannot place the order. 

### Things to consider 
1. After adding a non-valid input to a field, a verification is needed to make sure that the right error message is presented to the user (for the email field, for example, the message “Enter a valid email” should be presented to the user under the field). 
2. After navigating to a page add at least one verification to make sure that you got to the right place. 

### Bonus points: 
1. After adding all the items to the bag verify that the number-badge on the bag icon holds the correct number of items (for the first scenario, for example, the number in the badge should be 6) 
2. Verify that when the error message is presented to the user the header color changes to red. 
3. On “Your Cart” page add verification to the Total amount of the order (for the first scenario, for example the total should be Total: £33.00 GBP) 

## Part 2 - API testing 
For this part of the test we are going to use this API https://petstore.swagger.io to test your API automation testing skills. This is a basic API for managing a pet store app. We use it just for documentation purposes, and the request you send will not be saved to the DB. 
*Note that this is a playground site and some of the information changes from time to time. 
1. Create new pet: 
- Design a POST request to create a new pet with "status": "available" in the pet store. 
- Update the pet to "status": "sold". 
2. Find a pet by status: 
- Find a pet by status: “available” 
- Verify that the name of the fourth pet name is “Puff”. 
- Log the pet object to the console. 
3. Find another pet by status: 
- Find a pet by status: “sold”. 
- Validate that all the items that returned in the response have the expected status. - 
## Part 3 - Just for fun to know you better 
Imagine you have a time machine and you can visit any point in the past, but you have to return to the present after 24 hours. To when and where would you set the dial and why? 
Thank you for dedicating your time and effort, we are sure you did your best. Good luck! 
Dropit family.
