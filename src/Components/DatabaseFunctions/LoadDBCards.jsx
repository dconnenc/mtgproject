import { Link } from "react-router-dom";

export const LoadDBCards = ({setCards, setComparisonCards, userDBCards, user}) => {
    
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }

    const handleClick = (e) => {
        e.preventDefault();
        let parsedCards = JSON.parse(userDBCards.cards)
        console.log(parsedCards)
        let cards = parsedCards.cards
        
        //loads cards to table by useEffect
        setCards(cards);

        //sets comparison cards
        let comparisonCard1 = getRandomInt(cards?.length);
        let comparisonCard2 = getRandomInt(cards?.length);
        
        setComparisonCards([cards[comparisonCard1], cards[comparisonCard2]])
    }

    return(
    <>
        {/*<button type="btn btn-success" onClick="location.href='https://google.com';" value="Go to Google" />*/}
        <Link to={`/profile/${user.id}/${userDBCards.list}`}><button className="btn btn-success">Load</button></Link>
    </>
    )
}