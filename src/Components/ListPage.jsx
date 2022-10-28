import { Footer } from "./Footer";
import { Header } from "./Header";
import { useParams } from "react-router-dom";
import { useEffect, useContext } from 'react';
import { ListManager } from "./ListManager";
import { CardsContext } from "./AppContext";

export const ListPage = ({background}) => {
  const { id, list } = useParams();
  const context = useContext(CardsContext);
  
  const [cards, setCards] = context["cards"]

  const fetchDBCardsByIdAndList = async () => {
    try {
      const response = await fetch(`http://localhost:3001/usersCards/${id}/${list}`,
          { method: "GET" })
      const jsonData = await response.json();
      setCards(jsonData);
      //setUserDBCards(jsonData)
    } catch (error) {
        console.error(error.message)
    }
  }

  useEffect(() => {
    fetchDBCardsByIdAndList();
  }, [])

    return(
      <div id="master-div" className=".container " style={{
          backgroundImage: `url(${background})`,
          backgroundRepeat:"no-repeat",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          boxShadow: "inset 0 0 0 1000px rgba(0,0,0,.4)"
      }}>
          <Header />
          <div className="col" style={{
              paddingTop: "25%"
          }}>
              Profile page for {list}
          </div>
          <ListManager />
          <Footer />
      </div>
    )
}
