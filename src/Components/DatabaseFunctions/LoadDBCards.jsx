export const LoadDBCards = ({setCards, setComparisonCards, userDBCards}) => {
    
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }

    const handleClick = (e) => {
        e.preventDefault();
        let parsedCards = JSON.parse(userDBCards.cards)
        let cards = parsedCards.scoredCards
       
        //loads cards to table by useEffect
        setCards(cards);

        //sets comparison cards
        let comparisonCard1 = getRandomInt(cards.length);
        let comparisonCard2 = getRandomInt(cards.length);
        
        setComparisonCards([cards[comparisonCard1], cards[comparisonCard2]])
    }

    return(
    <>
        <button className="btn btn-success" onClick={handleClick}>Load</button>
    </>
    )
}