export const postDBCards = async (scoredCards, id, list) => {
    try {
        await fetch(`${process.env.REACT_APP_API_URL}/usersCards/${id}/${list}`, {
            method: "POST",
            headers: { "Content-Type": "application/json",},
            body: JSON.stringify({ cards: scoredCards })
        })
        .then(response => {
          response.json()
        })
    } catch (err) {
        console.error(err.message);
    }
  }