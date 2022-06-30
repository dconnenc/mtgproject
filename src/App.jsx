import { useState } from "react";
import "./styles/App.css";
import FileHandler from "./Components/fileHandler";
import ImagePreviewer from "./Components/ImagePreviewer";
import { Header } from "./Components/Header";
import { Comparison } from "./Components/Comparison";
import { Table } from "./Components/Table";
import { Background} from "./Components/Background"

//import { GlobalState } from './Components/GlobalState';

/*
-Only one batch of cards is rendering to the table.
-Cards with "//" in their name are throwing out errors in mouseover.
-Component FileHandler needs to be atomized.
  Big errors since cutting up the table, and renaming "Card" to "TableRow"
-Flesh out GlobalState and create state store.
-Amend ScryFallQuery to accept "/random" in place of "/collection"
  -ScryfallQuery has been throwing errors for the commented out portion regarding "err"
-Create a comparison unit for card score evaulation, either in 1 of 16, or 1v1 comparison.
-Styling, styling, styling.
  -create funtion to render rarity as a single letter, ie U, C, R, M
  -create function to render color idenity as a splash of color
  -why is not spread across whole screen?
  -create function that sets background to random basic land full art
-Later: User and reserve for saving cards and scores.
*/

function App() {
  const [cardInput, setCardInput] = useState([]);
  const [cards, setCards] = useState([]);
  const [previewCard, setPreviewCard] = useState([]);
  const [comparisonCards, setComparisonCards] = useState([]);
  const [background, setBackground] = useState([]);

  return (
    <div id="master-div" className=".container" style={{
      backgroundImage: `url(${background})`,
      backgroundRepeat:"no-repeat",
      backgroundSize: "cover",
      height: "100vh",
      boxShadow: "inset 0 0 0 1000px rgba(0,0,0,.4)",
    }}>
      {/* <GlobalState> */}
      <Header />
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
      <div className="row" id="table-main">
        <div className="col-3">
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
      {/*</GlobalState> */}
    </div>
  );
}

export default App;
