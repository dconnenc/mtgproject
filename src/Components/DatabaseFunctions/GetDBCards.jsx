export const GetDBCards = () => {
    const getDBCards = () => {
        
        fetch('http://localhost:3001/users')
        .then(res => res.json())
        .then(json => console.log(json))
    }
    return(
        <>
            <button onClick={getDBCards()}>Get Cards</button>
        </>
    )
}