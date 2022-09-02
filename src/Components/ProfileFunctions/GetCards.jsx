export const GetCards = () => {
    const getCards = () => {
        fetch('http://localhost:3001/users')
        .then(res => res.json())
        .then(json => console.log(json))
    }

    return(
        <>
            <button onClick={getCards()}>Get Cards</button>
        </>
    )
}