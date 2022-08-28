export const PostCards = ( {cards} ) => {
    const saveCards = async e => {
        e.preventDefault();

        ///move this up in the application to filehandler?
        const formattedCards = cards.map(card => {
          const { color_identity, image_uris, name, score, rarity } = card;

          return { 
            color_identity,
            image_uris: image_uris?.normal, 
            name, 
            score, 
            rarity
          }
        });
        const stringifiedCards = JSON.stringify(formattedCards);
        try {
            await fetch("http://localhost:3001/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: "default name", email: "default email", cards: stringifiedCards})
            })
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <button onClick={saveCards}> Save List </button>
    )
}

/* ///CODE FOR COMPARISON WHILE I FIGURE OUT WHAT I NEED TO BE SENDING TO BACKEND /// 

const createUser = (request, response) => {
  const { name, email } = request.body

  pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.insertId}`)
  })
}
*/