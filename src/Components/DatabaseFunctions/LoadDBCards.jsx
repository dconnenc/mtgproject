export const LoadDBCards = ({setCards, id}) => {

    return(
    <>
        <button className="btn btn-success" onClick={setCards(id)}>Load</button>
    </>
    )
}