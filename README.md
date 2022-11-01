# My p1p1

A companion application for Magic the Gathering.

Users can create their own lists for public evaluation in a classic P1P1 set-up. See draftaholics.com for comparison.


//To Launch//

Front end launches from MTGPROJECT folder with:
npm start 

Back end launches from BACKEND folder with:
cd backend
node node.js

Database is run through Postgres, coded through knex:
npx knex migrate:latest


//Interface//
There is a seed file located in the src/Assets folder containing an example of file for submission. 



//The Stack//
Most async functions live in the DatabaseFunctions folder.

Functions fired from here will target an API, the <node> file in the Backend folder.

The routes are defined the node file, and import the specific database queries from the <queries> file. 


//Known Bugs & ToDo List//
-Some double cards ie "Expansion // Explosion" are not rendering images

-DBList is not updating when DeleteDBCards runs. 

-UpdateCardScores() appears to be saving additional instances of the data to the database.

-Review GetCardsByIDandList() in the ListPage component. Cards.cards.cards seems supsicious?

//Styling, styling, styling//
-Set default background if query doesn't load
-Set default preview to cardback
  -add some smoothing animation
-Create <Loading /> component to render during load times. 
