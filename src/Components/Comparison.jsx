import { useContext } from "react";
import { CardsContext } from "./AppContext"
import { UpdateCardScore } from "./Functions/UpdateCardScore";

export const Comparison = ({ user }) => {

  const context = useContext(CardsContext);

  const [listName, setListName] = context["listName"]
  const [cards, setCards] = context["cards"]
  const [comparisonCards, setComparisonCards] = context["comparisonCards"]
  const [userDBCards, setUserDBCards] = context["userDBCards"]

  //patches db entry in the cards column of the cards table
  //hits the node.js file on the backend

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
    UpdateCardScore(cards, user.id, userDBCards.cards[0]?.list)
      
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
      <img onClick={() => newComparison(0)} src={firstCard?.image_uris ? firstCard?.image_uris : firstCard?.card_faces[0].image_uris.normal } alt="" id="comparison-card" className={`comparison-card`}></img>
      <img onClick={() => newComparison(1)} src={secondCard?.image_uris ? secondCard?.image_uris : secondCard?.card_faces[0].image_uris.normal } alt="" id="comparison-card" className={`comparison-card`}></img>
    </div>
    </div>
  );
};
