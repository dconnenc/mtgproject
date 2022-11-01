//Used in <DeleteDBCards /> component. 
export const deleteDBCards = async () => {
    try {
        console.log(id, list)
        await fetch(`http://localhost:3001/usersCards/${id}/${list}`, 
            { method: 'DELETE' }
        )
    } catch (error) {
        console.error(error.message)
    }
}

//Used in <DBContainer /> Component
export const fetchDBCards = useCallback(async () => {
    try {
        const user_id = user.id;
        
        const response = await fetch(`http://localhost:3001/usersCards/${user_id}`,
            { method: "GET" })
        const jsonData = await response.json();
        console.log(jsonData)
        setUserDBCards(jsonData)
    } catch (error) {
        console.error(error.message)
    }
}, [setUserDBCards, user.id])


//Used in <Comparison /> component. 
export const dbScorePatch = async (scoredCards) => {
    const id = user.id;
    const description = userDBCards.cards[0]?.list;
    
    try {
      await fetch(`http://localhost:3001/usersCards/${id}/${description}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json",},
        body: JSON.stringify({ scoredCards })
      })
      .then((response) => response.json())
      .then((json) => console.log(json));
    } catch (error) {
        console.error(error.message)
    }
}

//Used in Index.js
const findOrCreateUser = async (externalUser, setUser) => {
    const name    =       `${externalUser.given_name} ${externalUser.family_name}`;
    const email   =       externalUser.email;
    const external_id =   externalUser.sub;
  
    try {
      await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: { "Content-Type": "application/json",},
        body: JSON.stringify({ name: name, email: email, external_id: external_id })
      })
        .then(response => response.json())
        .then((data) => {
          // the setUser callback is called here to indicate the user is
          // hydrayed with backend data and a page can be rendered knowing a user
          // is ready and authenticated
          setUser({ ...data[0], fetching: false });
        });
    } catch (error) {
      console.error(error.message)
    }
}