import { useState, useEffect, useContext } from "react";
import "./styles/App.scss";
import { Header } from "./Components/Header";
import { backgroundQuery } from "./Components/Functions/backgroundQuery"
import { Footer } from "./Components/Footer";
import { CardsContext } from "./Components/AppContext"
import { ListManager } from "./Components/ListManager"

function App({user}) {

  const contextCards = useContext(CardsContext);
  const [cards, setCards] = contextCards["cards"];
  const [comparisonCards, setComparisonCards] = contextCards["comparisonCards"];
  const [background, setBackground] = useState([]);

  const fetchDefaultCards = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/usersCards/-1`,
        { method: "GET" })
      const jsonData = await response.json();
      
      let parsedCards = JSON.parse(jsonData.cards[0].cards)
      
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
    setCards([]);
    fetchDefaultCards();
  }, [])
  
  return (
    <div className="background-image" style={{
      backgroundImage: `url(${background})`,
  }}>
      <Header user={user}/>

      <ListManager user={user} />
      
      <Footer />
  </div>
  );
}
export default App;
