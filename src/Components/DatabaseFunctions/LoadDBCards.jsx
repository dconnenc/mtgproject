export const LoadDBCards = ({setCards, setComparisonCards, cards}) => {
    
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }

    const handleClick = (e) => {
        e.preventDefault();
        let parsedCards = JSON.parse(cards)
        //loads cards to table
        setCards(parsedCards);
        
        //sets comparison cards
        let comparisonCard1 = getRandomInt(parsedCards.length);
        let comparisonCard2 = getRandomInt(parsedCards.length);
        
        setComparisonCards([parsedCards[comparisonCard1], parsedCards[comparisonCard2]])
    }

    return(
    <>
        <button className="btn btn-success" onClick={handleClick}>Load</button>
    </>
    )
}