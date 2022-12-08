export const findOrCreateUser = async (externalUser, setUser) => {
    const name    =       `${externalUser.given_name} ${externalUser.family_name}`;
    const email   =       externalUser.email;
    const external_id =   externalUser.sub;
  
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json",},
        body: JSON.stringify({ name: name, email: email, external_id: external_id })
      })
        .then(response => response.json())
        .then((data) => {
          setUser({ ...data[0], fetching: false });
        });
    } catch (error) {
      console.error(error.message)
    }
}