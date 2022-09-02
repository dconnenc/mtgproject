import { useState } from "react";
import "./styles/App.css";
import FileHandler from "./Components/fileHandler";
import ImagePreviewer from "./Components/ImagePreviewer";
import { Header } from "./Components/Header";
import { Comparison } from "./Components/Comparison";
import { Table } from "./Components/Table";
import { Background} from "./Components/Background"
import { Footer } from "./Components/Footer";
import { ProfileContainer } from "./Components/ProfileFunctions/ProfileContainer";

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

        <ProfileContainer cards={cards}/>

        <div className="row .container">
          <div className="col-3 .container" id="preview-container">
            <ImagePreviewer previewCard={previewCard} />
          </div>
          <div className="col-9">
            <Table setPreviewCard={setPreviewCard} cards={cards} />
          </div>
        </div>
        <FileHandler
          cardInput={cardInput}
          setCardInput={setCardInput}
          previewCard={previewCard}
          setPreviewCard={setPreviewCard}
          cards={cards}
          setCards={setCards}
          setComparisonCards={setComparisonCards}
        />
        <Footer />
      {/*</GlobalState> */}
    </div>
  );
}

export default App;
