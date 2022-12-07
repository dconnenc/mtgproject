/*This code defines a Comparison React component that allows a user to select one of two cards and updates the card's score in the database.

The code generates random card numbers using the Math.random function and then uses these numbers to select cards from the list. 
However, this approach has the potential to select the same card twice,
which can be avoided by using a Fisher-Yates shuffle algorithm to shuffle the list of cards and then selecting the first two cards from the shuffled list.

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    // Pick a random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));

    // Swap the element at i with the element at j
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

*/


import { useContext, useEffect } from "react";
import { CardsContext } from "./AppContext"
import { UpdateCardScore } from "./Functions/UpdateCardScore";

export const Comparison = ({ user }) => {

  const context = useContext(CardsContext);

  const [listName, setListName] = context["listName"]
  const [cards, setCards] = context["cards"]
  const [comparisonCards, setComparisonCards] = context["comparisonCards"]

  //patches db entry in the cards column of the cards table
  //hits the node.js file on the backend
  const newComparison = (winner, loser) => {
    //adjusts the cards ELO, and sorts table accordingly
    //note: cards with equivalent score are being rearranged. Possible to maintain score tiers?
    setCards(cards.map(obj => {
      if(obj.name === comparisonCards[winner][0].name){
        return {...obj, score: obj.score + 1}
      } else if(obj.name === comparisonCards[loser][0].name) {
        return {...obj, score: obj.score - 1}
      } else {
        return obj;
      }}).sort((a, b) => (a.score < b.score) ? 1 : -1))
    
    //update the DB with new values
    UpdateCardScore(cards, user.id, listName)
      
    //sets the comparison cards to two random cards from the list
    const randomCardNum = Math.floor(Math.random() * cards.length)
    const randomCardNum1 = Math.floor(Math.random() * cards.length)

    const [first, second] = comparisonCards
    setComparisonCards([[cards[randomCardNum], ...first.slice(0, 4)], [cards[randomCardNum1], ...second.slice(0,4)]])
  } 

  useEffect(() => { 
    if (comparisonCards[0].length === 0 && cards.length)  {
      //sets the comparison cards to two random cards from the list
      const randomCardNum = Math.floor(Math.random() * cards.length)
      const randomCardNum1 = Math.floor(Math.random() * cards.length)
      
      setComparisonCards([[cards[randomCardNum]], [cards[randomCardNum1]]])
  }
}, [cards])

  const [firstList, secondList] = comparisonCards;

  if(!firstList?.length){
      return (
        <div>No Comparison Cards</div>
      )
  } else {
      return (
    <> 
      <div className="instruction-wrapper whitesmoke below-header">
        <div className="">P1P1 - {listName}</div>
        <div>Pack 1 Pick 1 <br /> Which would you choose? </div>
      </div>
      <div className="comparison-card-container" id="comparison-card-container">
        <div className="stacked-cards-first">
          {
            firstList.map((card, index) => {
              if(index === 0){
                return <img key={card.name} onClick={() => newComparison(0, 1)} 
                            src={card.image_uris ? card.image_uris : card.card_faces[0].image_uris.normal } 
                            alt="" id="first-comparison-card" className={`first-comparison-card`}/>
              } else {
                return <img key={card.name} 
                            src={card.image_uris ? card.image_uris : card.card_faces[0].image_uris.normal }
                            alt="" id="comparison-card" className={`first-comparison-card-${index}`}/>
              }
          })}
        </div>
        <div className="stacked-cards-second">
          {
            secondList.map((card, index) => {
              if(index === 0){
                return  <img  key={card.name} onClick={() => newComparison(1, 0)} 
                                src={card.image_uris ? card.image_uris : card.card_faces[0].image_uris.normal }
                                alt="" id="comparison-card" className={`second-comparison-card`} />
              } else {
                return  <img  key={card.name} src={card.image_uris ? card.image_uris : card.card_faces[0].image_uris.normal } 
                                alt="" id="comparison-card" className={`second-comparison-card-${index}`} />
              }
          })} 
        </div>
      </div>
    </>
  );
}};
