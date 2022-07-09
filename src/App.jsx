import { useState } from "react";
import "./styles/App.css";
import FileHandler from "./Components/fileHandler";
import ImagePreviewer from "./Components/ImagePreviewer";
import { Header } from "./Components/Header";
import { Comparison } from "./Components/Comparison";
import { Table } from "./Components/Table";
import { Background} from "./Components/Background"
import { Footer } from "./Components/Footer";

//import { GlobalState } from './Components/GlobalState';

/* 

//KNOWN BUGS
-Cards with "//" in their name are throwing out errors in mouseover.
-Memory Leak when setting ComparisonCards to a Random Card during first load.
-Cards are losing color splash on comparison click
-Why do I need to do an npm install? 

//TOO DOO
-Flesh out GlobalState and create state store.
-Later: User and reserve for saving cards and scores.
  -Postgress, MySQL ?
  -User table vs query table
  -https://blog.logrocket.com/getting-started-with-postgres-in-your-react-app/
  -https://www.mongodb.com/compare/relational-vs-non-relational-databases
  -https://andrewbaisden.medium.com/creating-react-node-apps-that-connect-to-postgresql-and-harperdb-2734771c5261
//Styling, styling, styling.
-Set default background if query doesn't load
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
      backgroundRepeat:"no-repeat",
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
      boxShadow: "inset 0 0 0 1000px rgba(0,0,0,.4)"
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
