import { useState } from "react";
import "./styles/App.css";
import FileHandler from "./Components/fileHandler";
import ImagePreviewer from "./Components/ImagePreviewer";
import { Header } from "./Components/Header";
import { Comparison } from "./Components/Comparison";
import { Table } from "./Components/Table";
import { Background} from "./Components/Background"
import { Footer } from "./Components/Footer";
import { DBContainer } from "./Components/DatabaseFunctions/DBContainer";
import { useAuth0 } from "@auth0/auth0-react";

/* 

//KNOWN BUGS
-Cards with "//" in their name are throwing out errors in mouseover.
-Memory Leak when setting ComparisonCards to a Random Card during first load.

//TO DO
user authentication to database?
https://auth0.com/blog/configuring-postgresql-as-auth0-custom-database/

-Login Management
  •Set login management, and visibility for components based on that. 

-Pagination: 
  •Set up profile 'page' using visibility.
  •User page that displays their list.

-BACKEND:
  •Unify my node / index files?

//Styling, styling, styling.cd
-Set default background if query doesn't load
-Fix background to whole page, so there isn't whitespace at the bottom.
-Set default preview to cardback
  -add some smoothing animation
*/

function App() {
  const [cardInput, setCardInput] = useState([]);
  const [cards, setCards] = useState([]);
  const [previewCard, setPreviewCard] = useState([]);
  const [comparisonCards, setComparisonCards] = useState([]);
  const [background, setBackground] = useState([]);
  const [userDBCards, setUserDBCards] = useState([]);

  const { user, isAuthenticated, isLoading } = useAuth0();

  
  //TODO: set background to return a default image if there is no background.length
  if(!isAuthenticated && !isLoading ) {
    window.location.href = "http://localhost:3000/auth"
  } else {
     
    //insert user token into database
     const postUser = async () => {

      const name = `${user.given_name} ${user.family_name}`;
      const email = user.email;
      const user_id =  user.sub;

      try {
        await fetch("http://localhost:3001/users", {
          method: "POST",
          headers: { "Content-Type": "application/json",},
          body: JSON.stringify({ name: name, email: email, user_id: user_id }) 
        })
        console.log("checkpoint?")
      } catch (error) {
        console.error(error.message)
      }
    }
    
    postUser()

    return (
      <div id="master-div" className=".container"  style={{
        backgroundImage: `url(${background})`,
      }}>
        {/* <GlobalState> */}
          <Header 
            background={background}
            setBackground={setBackground}
            cards={cards}
          />

          <Background 
            background={background}
            setBackground={setBackground}
          />

          <Comparison
            cards={cards}
            setCards={setCards} 
            comparisonCards={comparisonCards}
            setComparisonCards={setComparisonCards}  
          />
          
          <div className="row .container">
            <div className="col-3 .container" id="preview-container">
              <ImagePreviewer previewCard={previewCard} />
            </div>
            <div className="col-6 .container" id="tableContainer">
              <FileHandler
                cardInput={cardInput}
                setCardInput={setCardInput}
                previewCard={previewCard}
                setPreviewCard={setPreviewCard}
                cards={cards}
                setCards={setCards}
                setComparisonCards={setComparisonCards}
              />
              <DBContainer 
                cards={cards} 
                setCards={setCards} 
                userDBCards={userDBCards}
                setUserDBCards={setUserDBCards}
                setComparisonCards={setComparisonCards}
                />
              <Table setPreviewCard={setPreviewCard} cards={cards} />
            </div>
            <div className="col-3 .container" id="DBcontainer">
              {/*
                <DBContainer 
                cards={cards} 
                setCards={setCards} 
                userDBCards={userDBCards}
                setUserDBCards={setUserDBCards}
                />
              */}
            </div>
          </div>
          <Footer />
        {/*</GlobalState> */}
      </div>
    );
  }
}
export default App;
