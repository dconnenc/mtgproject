import { useContext, useEffect } from "react";
import { CardsContext } from "./AppContext"
import { UpdateCardScore } from "./Functions/UpdateCardScore";
import { randomNumber } from "./Functions/randomNumberGenerator";


export const Comparison = ({ user, list }) => {

  const context = useContext(CardsContext);
  const [cards, setCards] = context["cards"]
  const [comparisonCards, setComparisonCards] = context["comparisonCards"]
  const [cardsLoaded, setCardsLoaded] = context["cardsLoaded"];

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
    UpdateCardScore(cards, user.id, list)
      
    let [firstNum, secondNum] = randomNumber(cards.length);
    const [first, second] = comparisonCards
    setComparisonCards([[cards[firstNum], ...first.slice(0, 4)], [cards[secondNum], ...second.slice(0,4)]])
  } 

  useEffect(() => {
    console.log('useEffect made it to gate');
    if(cards.length){
      //summons [0, i] noncolliding numbers
      let [firstNum, secondNum] = randomNumber(cards.length);
      setComparisonCards([[cards[firstNum]], [cards[secondNum]]])
      console.log("useEffect made it to:", comparisonCards);
    }
}, [cardsLoaded])  

  const [firstList, secondList] = comparisonCards;

  if(!comparisonCards?.length){
      return (
        <div>No Comparison Cards</div>
      )
  } else {
      return (
    <> 
      <div className="instruction-wrapper whitesmoke below-header">
        <div className="">P1P1 - {list ? list : 'MTGO Vintage Cube'}</div>
        <div>Pack 1 Pick 1 <br /> Which would you choose? </div>
      </div>
      <div className="comparison-card-container" id="comparison-card-container">
        <div className="stacked-cards-first">
          {
            firstList.map((card, index) => {
              if(index === 0){
                return <img key={card.name} onClick={() => newComparison(0, 1)} 
                            src={card.image.front} 
                            alt="" id="first-comparison-card" className={`first-comparison-card`}/>
              } else {
                return <img key={card.name} 
                            src={card.image.front}
                            alt="" id="comparison-card" className={`first-comparison-card-${index}`}/>
              }
          })}
        </div>
        <div className="stacked-cards-second">
          {
            secondList.map((card, index) => {
              if(index === 0){
                return  <img  key={card.name} onClick={() => newComparison(1, 0)} 
                                src={card.image.front}
                                alt="" id="comparison-card" className={`second-comparison-card`} />
              } else {
                return  <img  key={card.name} src={card.image.front} 
                                alt="" id="comparison-card" className={`second-comparison-card-${index}`} />
              }
          })} 
        </div>
      </div>
    </>
  );
}};
