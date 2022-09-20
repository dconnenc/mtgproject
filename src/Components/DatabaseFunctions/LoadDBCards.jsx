export const LoadDBCards = ({setCards, setComparisonCards, cards}) => {

    const handleClick = (e) => {
        e.preventDefault();
        let parsedCards = JSON.parse(cards)
        
        console.log(parsedCards)
        setCards(parsedCards);
    }

    return(
    <>
        <button className="btn btn-success" onClick={handleClick}>Load</button>
    </>
    )
}