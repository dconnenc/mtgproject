import { useState, useEffect, useContext } from "react";
import "./styles/App.css";

import ImagePreviewer from "./Components/ImagePreviewer";
import { Header } from "./Components/Header";
import { Comparison } from "./Components/Comparison";
import { Table } from "./Components/Table";
import { backgroundQuery } from "./Components/backgroundQuery"
import { Footer } from "./Components/Footer";
import { CardsContext } from "./Components/AppContext"

function App({user}) {

  const contextCards = useContext(CardsContext);
  const [cards, setCards] = contextCards["cards"];

  const [background, setBackground] = useState([]);

  const fetchDefaultCards = async () => {
    try {
      const response = await fetch("http://localhost:3001/usersCards/-1",
        { method: "GET" })
      const jsonData = await response.json();

      let parsedCards = JSON.parse(jsonData.cards[0].cards)
      console.log("parsed cards=", parsedCards)
      setCards(parsedCards.cards)
  
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    backgroundQuery()
      .then(data => {
          setBackground(data.image_uris.art_crop);
      })
      .catch(error =>
        console.log(error.message));
  }, [setBackground]);

  useEffect(()=> {
    fetchDefaultCards();
  }, []) 
   //insert user token into database
  return (
    <div id="master-div" className=".container"  style={{
      backgroundImage: `url(${background})`,
    }}>
        <Header user={user} />
        <div className="main-container">
          <Comparison user={user} />
        </div>
        <div className="row .container">
          <div className="col-3 .container" id="preview-container">
            <ImagePreviewer />
          </div>
          <div className="col-6 .container" id="tableContainer">
            <Table />
          </div>
        </div>
        <Footer />
    </div>
  );
}
export default App;
