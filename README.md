# OTC-drug-tracker

## Group Project #3 for GWU Bootcamp March 2018
### Chandler Dibble, Nicole Yoon, Al Curry, Tim Hill, Adam Specker

# Overview
An application built to help consumers find and keep track of over-the-counter drugs they currently use and have taken

**Please visit out application here: 

**Real World Problem:

People young and old whether they take large or small amounts of medicines, need to keep track of them. For years people have attended doctors offices for their regular checks or for other cases and could not provide their with an appropriate respoinses in regards to their recents medine intake. There is a need for a pill tracking application that allows users to keep track fo the drugs they are currently taking and keep those historicals even after they stop such. User will have ability to pull up this information right from their phone to ensure they can provide their doctor or simply themselves of their medicine intake. Staying health and furthermore keeping track of ones helath is of utmost important in life and pill pal helps managing that easier. 

**How can we solve this?

   Utilize an MVC model app using a database with profile capabilities and the FDA open api to allow users to:
    * User ability to create account with encrypted password for security
      *Login and logout capability
    * Keep track of their OTC medication use, with easy access to information about those drugs
        * Profile page with two seperate data sets of active and historical medicnes taken
        * These medications to active or inactive, with data logged based on time of administration by user
    * User will hahve ability to Search the open FDA api for a particular medicone with information about it:
    
    *Brand Name
    *Generic Name
    *NDC Number
    *Warnings
      *General
      *Pregnancy
      *Etc. 
    *Ingredients
    *Route
    *Dosage and Administration
    *Purpose
    *And more!

**Dependeices used:

    *bcrypt-nodejs
    *body-parser
    *dotenv
    *express
    *express-handlebars
    *express-session
    *mysql
    *mysql2
    *passport
    *passport-local
    *sequelize


    
### March 27 - Adding on Core Functions
* basic site flow and functionality is in place
* nicole is adding css and design elements
* chandler is working on the search function integrated into site flow
* al is working on contact form
* adam is working on med page
* tim is wrangling the ajax calls, moving some to backend; handlebar debuggin
* EOD - core function of site is in place
    * search, login/register, add med all working
    * user flow is continuous around the page
    * needs MUCH more refinement in all areas

### March 26 - Integrating Files
* the goal today is to have all the files integrated and working in a base functional level by EoD
    * we were not successful at this today
    * users can login and signup
    * users can see their meds displayed in a crude form on their myotc hub
* functionality needed - 
    * users need to add a medicine from the search page to their hub
    * SOLVE ERROR of can't set headers after theyre sent
    
    
### March 23 - Planning and Setup
* Morning
    * al and chandler are discussing the data structure
    * nicole is building the wireframes and converting those into html
    * adam and tim are looking into the api endpoints
        * modelling how we want to query the api
        * building our query strings
    

### March 22 - Project Initialize 
* role distribution:
    * al: database- data structure and models
    * nicole: UI/front end - handlebars for our views, making the site very usable and readable
    * chandler: middleware, resource point man - finding and learning new tech, documenting our resources
    * tim: encryption and authentication - handling routing and using passport and bcrypt
    * adam: project direction/management, flex role - maintain trello, project notes, assist whichever groups need help

* assignments for the night
    * everyone will do a deep dive on the homework to understand:
        * routing for a full stack app
        * file structure for an MVC model app
        * examine usage of passport and bcrypt modules
    * al - will muse on data structure and look into API querying and documentation
    * nicole - will design a few wireframe options based on todays whiteboard
    * chandler - explore lunr for fuzzy searches and WRITE GOOD NOTES
    * tim - will look into bcrypt 
    * adam - will set up trello and look into agile project management


