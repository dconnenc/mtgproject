# My p1p1

A companion application for Magic the Gathering.

Users can create their own lists for public evaluation in a classic P1P1 set-up. See draftaholics.com for comparison.

Front end launches from MTGPROJECT folder with:
npm start 

Back end launches from BACKEND folder with:
cd backend
node node.js

Database is run through Postgres, coded through knex:
npx knex migrate:latest

//The Stack//
Most async functions live in the DatabaseFunctions folder.

Functions fired from here will target an API, the <node> file in the Backend folder.

The routes are defined the node file, and import the specific database queries from the <queries> file. 


//Known Bugs
-Some double cards ie "Expansion // Explosion" are not rendering images

-UpdateCardScores() appears to be saving additional instances of the data to the database. 