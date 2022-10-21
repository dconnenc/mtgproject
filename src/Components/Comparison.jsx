export const Comparison = ({ user, cards, setCards, setComparisonCards, comparisonCards, userDBCards }) => {

  //pathces db entry in the cards column of the cards table
  //hits the node.js file on the backend
  const dbScorePatch = async (scoredCards) => {
    const id = user.id;
    const description = userDBCards.cards[0]?.list;
    
    try {
      await fetch(`http://localhost:3001/usersCards/${id}/${description}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json",},
        body: JSON.stringify({ scoredCards })
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

  const [firstCard, secondCard] = comparisonCards;

    return (
    <div className=".container comparison-card-container" id="comparison-card-container">
      <img onClick={() => newComparison(0)} src={firstCard.image_uris} alt="" id="comparison-card" className={`comparison-card ${firstCard.name.includes('//') ? 'horizontal' : ''}`}></img>
      <img onClick={() => newComparison(1)} src={secondCard.image_uris} alt="" id="comparison-card" className={`comparison-card ${secondCard.name.includes('//') ? 'horizontal' : ''}`}></img>
    </div>
  );
};
