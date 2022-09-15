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

/* 

//KNOWN BUGS
-Cards with "//" in their name are throwing out errors in mouseover.
-Memory Leak when setting ComparisonCards to a Random Card during first load.

//TO DO
-Pagination: 
  •Set up profile 'page' using visibility.
  •Undo the react router, too many issues with state management. 
-BACKEND:
  •Finish backend routes.  
  •User and reserve for saving cards and scores.
  •Unify my node / index files?
  •Set Auth0 data to state

//Styling, styling, styling.cd
-Set default background if query doesn't load
-Set CardTable to scroll its contents, not the whole page.
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

  //TODO: set background to return a default image if there is no background.length
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
          <DBContainer 
              cards={cards} 
              setCards={setCards} 
              userDBCards={userDBCards}
              setUserDBCards={setUserDBCards}
              />
            <FileHandler
              cardInput={cardInput}
              setCardInput={setCardInput}
              previewCard={previewCard}
              setPreviewCard={setPreviewCard}
              cards={cards}
              setCards={setCards}
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

export default App;
