# My p1p1

A companion application for Magic the Gathering.

Users can create their own lists for public evaluation in a classic P1P1 set-up. See www.draftaholics.com for comparison.


//To Launch//

Front end launches from MTGPROJECT folder with:
•npm develop

Back end launches from BACKEND folder with:
•cd backend
•node node.js

Database is run through Postgres, coded through knex:
•npx knex seed:run
•npx knex migrate:latest


//Interface//
There is a seed file located in the src/Assets folder containing an example of file for submission. 


//The Stack//
Most async functions live in the DatabaseFunctions folder.

Functions fired from here will target an API, the <node> file in the Backend folder.

The routes are defined the node file, and import the specific database queries from the <queries> file. 


//Known Bugs & ToDo List//
-Implement Logic to dualfaced cards to be flipped

-DBPatch for Comparison on landing page. Currently it is fed ID from logged in user, and a list from... where? This function should be agnostic

-Smarts for rendering list name in the Comparison Heading

-Review GetCardsByIDandList() in the ListPage component. Cards.cards.cards seems supsicious?

-Create <Loading /> component to render during load times
  •On usercreation or fetch
  •On Filehandler submission

-Restructure
  •"App.jsx" >>> LandingPage
  •"Index.jsx" >>> App
  • Create "Pages" folder.

-Add Profile Editing
-Add List Name Editing

//Styling, styling, styling//
-Image Preview location needs to be set
-Typeface's need be updated
-Why can't I get rid of the underline in the profile


