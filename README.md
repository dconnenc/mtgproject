# My p1p1

A companion application for Magic the Gathering.

Users can create their own lists for public evaluation in a classic P1P1 set-up. See www.draftaholics.com for comparison.


//To Launch//

##Front end launches from MTGPROJECT folder with:
  •npm run develop

##Back end launches from BACKEND folder with:
  •cd backend
  •node node.js

##Database
Download and install Postgres
  •https://www.postgresql.org/download/
  •run the psql terminal
    •on windows: "psql" in search should find
  •once connected to postgres run "CREATE DATABASE api"

Database is run through Postgres, coded through knex:
  •npx knex migrate:latest
  •npx knex seed:run


//Interface//
There is a seed file located in the src/Assets folder containing an example of file for submission. 


//The Stack//
Verification is handled through Auth0.

Most async functions live in the DatabaseFunctions folder.

Functions fired from here will target an API, the <node> file in the Backend folder.

The routes are defined in the node file, and import the specific database queries from the <queries> file. 

The front end files are still in need of refactoring, and a are disorganized. 


//Known Bugs & ToDo List//
-Implement Logic to dualfaced cards to be flipped
-rerun stub seed for landing page to populate dualfaced cards. 
-"card-data" id duplication
-embedded login from auth0
-table row id not correct

-Comparison doesn't refresh on page load.

-DBPatch for Comparison on landing page. Currently it is fed ID from logged in user, and a list from... where? This function should be agnostic

-Review GetCardsByIDandList() in the ListPage component. Cards.cards.cards seems supsicious?

-Restructure
  •"App.jsx" >>> LandingPage
  •"Index.jsx" >>> App
  • Create "Pages" folder.

-Add Profile Editing
-Add List Name Editing

-Implement Shuffle instead of Random Card

//Styling, styling, styling//


