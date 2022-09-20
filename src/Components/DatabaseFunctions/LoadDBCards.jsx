export const LoadDBCards = ({setCards, cards}) => {

    const handleClick = (e) => {
        e.preventDefault();

        console.log(cards)
        //setCards(cards);
    }

    return(
    <>
        <button className="btn btn-success" onClick={handleClick}>Load</button>
    </>
    )
}