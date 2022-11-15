import { useContext } from "react";
import { CardsContext } from "./AppContext"

export const Comparison = ({ user }) => {

  const context = useContext(CardsContext);

  const [listName, setListName] = context["listName"]
  const [cards, setCards] = context["cards"]
  const [comparisonCards, setComparisonCards] = context["comparisonCards"]
  const [userDBCards, setUserDBCards] = context["userDBCards"]

  //patches db entry in the cards column of the cards table
  //hits the node.js file on the backend
  const dbScorePatch = async (cards) => {
    const id = user.id;
    const list = userDBCards.cards[0]?.list;

    try {   
      await fetch(`${process.env.REACT_APP_API_URL}/usersCards/${id}/${list}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json",},
        body: JSON.stringify({cards})
      })
      .then((response) => response.json())
    } catch (error) {
        console.error(error.message)
    }
  }

  const newComparison = (winner) => {
    //adjusts the cards ELO, and sorts table accordingly
    //note: cards with equivalent score are being rearranged. Possible to maintain score tiers?
    setCards(cards.map(obj => {
      if(obj.name === comparisonCards[winner].name){
        return {...obj, score: obj.score + 1}
      } else {
        return obj;
      }}).sort((a, b) => (a.score < b.score) ? 1 : -1))
    
    //update the DB with new values
    dbScorePatch(cards)

    //sets the comparison cards to two random cards from the list
    const randomCardNum = Math.floor(Math.random() * cards.length)
    const randomCardNum1 = Math.floor(Math.random() * cards.length)
    
    setComparisonCards([cards[randomCardNum], cards[randomCardNum1]])
  }
  
  if (!comparisonCards?.length){
    return <div></div>
  };

  const [firstCard, secondCard] = comparisonCards;
  
    return (
    <div className="text-center whitesmoke below-header">
      <h1>P1P1 - {listName}</h1>
      <h2>Pack 1 Pick 1 <br /> Which would you choose? </h2>
    <div className=".container comparison-card-container" id="comparison-card-container">
      <img onClick={() => newComparison(0)} src={firstCard?.image_uris} alt="" id="comparison-card" className={`comparison-card`}></img>
      <img onClick={() => newComparison(1)} src={secondCard?.image_uris} alt="" id="comparison-card" className={`comparison-card`}></img>
    </div>
    </div>
  );
};
