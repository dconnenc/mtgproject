export const Comparison = ({ cards, setCards, setComparisonCards, comparisonCards }) => {

  const newComparison = (winner) => {
    //adjusts the cards ELO, and sorts table accordingly
      //note: cards with equivalent score are being rearranged. Possible to maintain score tiers?
    setCards(cards.map(obj => {
      if(obj.name === comparisonCards[winner].name){
        return {...obj, score: obj.score + 1}
      } else {
        return obj;
      }}).sort((a, b) => (a.score < b.score) ? 1 : -1))

    //sets the comparison cards to two random cards from the list
    const randomCardNum = Math.floor(Math.random() * cards.length)
    const randomCardNum1 = Math.floor(Math.random() * cards.length)
    setComparisonCards([cards[randomCardNum], cards[randomCardNum1]])
  }
  if (!comparisonCards?.length){
    return <div></div>
  };
    return (
    <div className=".container" id="comparison-card-container">
      <div className="row">
        <div className="col-3"></div>
        <div className="col-3">
          <img onClick={() => newComparison(0)} src={comparisonCards[0].image_uris} alt="" id="comparison-card"></img>
        </div>
        <div className="col-3">
          <img onClick={() => newComparison(1)} src={comparisonCards[1].image_uris} alt="" id="comparison-card"></img>
        </div>
        <div className="col-3"></div>
      </div>
    </div>
  );
};
