import { useState, useEffect } from "react";
import "./styles/App.css";
import FileHandler from "./Components/fileHandler";
import ImagePreviewer from "./Components/ImagePreviewer";
import { Header } from "./Components/Header";
import { Comparison } from "./Components/Comparison";
import { Table } from "./Components/Table";
import { backgroundQuery } from "./Components/backgroundQuery"
import { Footer } from "./Components/Footer";
import { DBContainer } from "./Components/DatabaseFunctions/DBContainer";

/*
//KNOWN BUGS

//TO DO 
-Pagination:
  •Set up profile 'page' using visibility.
  •User page that displays their list.

//Styling, styling, styling.cd
-Set default background if query doesn't load
-Set default preview to cardback
  -add some smoothing animation
*/

function App({user}) {
  const [cardInput, setCardInput] = useState([]);
  const [cards, setCards] = useState([]);
  const [previewCard, setPreviewCard] = useState([]);
  const [comparisonCards, setComparisonCards] = useState([]);
  const [background, setBackground] = useState([]);
  const [userDBCards, setUserDBCards] = useState([]);

  useEffect(() => {
    backgroundQuery()
      .then(data => {
          setBackground(data.image_uris.art_crop);
      })
      .catch(error =>
        console.log(error.message));
  }, [setBackground]);

   //insert user token into database
  return (
    <div id="master-div" className=".container"  style={{
      backgroundImage: `url(${background})`,
    }}>
        <Header
          background={background}
          setBackground={setBackground}
          cards={cards}
          user={user}
        />

        <div className="main-container">
          <Comparison
            user={user}
            userDBCards={userDBCards}
            cards={cards}
            setCards={setCards}
            comparisonCards={comparisonCards}
            setComparisonCards={setComparisonCards}
          />
        </div>

        <div className="row .container">
          <div className="col-3 .container" id="preview-container">
            <ImagePreviewer previewCard={previewCard} cards={cards} />

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
              user={user}
            />
            <DBContainer
              user={user}
              cards={cards}
              setCards={setCards}
              userDBCards={userDBCards}
              setUserDBCards={setUserDBCards}
              setComparisonCards={setComparisonCards}
              />
            <Table
              setComparisonCards={setComparisonCards}
              setPreviewCard={setPreviewCard}
              cards={cards}
              setCards={setCards} />
          </div>
        </div>
        <Footer />
    </div>
  );
}
export default App;
