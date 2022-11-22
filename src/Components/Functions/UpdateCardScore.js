export const UpdateCardScore = async (cards, id, list) => {
    console.log(cards, id, list)
    try {   
      await fetch(`${process.env.REACT_APP_API_URL}/usersCards/${id}/${list}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json",},
        body: JSON.stringify({cards})
      })
      .then((response) => response.json())
    } catch (error) {
        console.error(error.message)
    }
  }