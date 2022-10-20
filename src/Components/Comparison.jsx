export const Comparison = ({ user, cards, setCards, setComparisonCards, comparisonCards, userDBCards }) => {

  //pathces db entry in the cards column of the cards table
  //hits the node.js file on the backend
  const dbScorePatch = async (scoredCards) => {
    const id = user.id;
    const description = userDBCards.cards[0].list;
    const body = JSON.stringify({  cards: scoredCards })

    try {
      await fetch(`http://localhost:3001/usersCards/${id}/${description}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json",},
        body: body
      })
      .then((response) => response.json())
      .then((json) => console.log(json));
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
