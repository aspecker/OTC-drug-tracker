# Med Trax

## Group Project #3 for GWU Bootcamp March 2018
### Chandler Dibble, Nicole Yoon, Al Curry, Tim Hill, Adam Specker

# Overview
An application built to help consumers find and keep track of over-the-counter drugs they currently use and have taken.

**Please visit out application here: http://med-trax.herokuapp.com

**Real World Problem:

People young and old whether they take large or small amounts of medicines, need to keep track of them. For years people have attended doctors offices for their regular checks or for other cases and could not provide their with an appropriate respoinses in regards to their recents medine intake. There is a need for a pill tracking application that allows users to keep track fo the drugs they are currently taking and keep those historicals even after they stop such. User will have ability to pull up this information right from their phone to ensure they can provide their doctor or simply themselves of their medicine intake. Staying health and furthermore keeping track of ones helath is of utmost important in life and med trax helps managing that easier. 

**How can we solve this?

   Utilize an MVC model app using a database with profile capabilities and the FDA open api to allow users to:
    * Create account with encrypted password
      * Login and logout capability
    * Keep track of their OTC medication use, with easy access to information about those drugs
        * Profile page with two seperate data sets of active and historical medicines taken
        * Medications set to active or inactive, with data logged based on time of administration by user
    * User will have ability to Search the open FDA api for a particular medicine with information about it:
    
    * Brand Name
    * Generic Name
    * NDC Number
    * Warnings
      * General
      * Pregnancy
      * Etc. 
    * Ingredients
    * Route
    * Dosage and Administration
    * Purpose
    * And more!

**Dependecies used:

    * bcrypt-nodejs
    * body-parser
    * dotenv
    * express
    * express-handlebars
    * express-session
    * mysql
    * mysql2
    * passport
    * passport-local
    * sequelize
    

