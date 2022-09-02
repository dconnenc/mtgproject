//Currently getting a CORS error, and data being transfered is too large.  
import { useAuth0 } from "@auth0/auth0-react";

export const PostCards = ( {cards} ) => {
    const { user } = useAuth0();
    const saveCards = async e => {
        e.preventDefault();
        
        const name = `${user.given_name} + ${user.family_name}`
        const email = user.email
        const stringifiedCards = JSON.stringify(cards);

        try {
            await fetch("http://localhost:3001/users", {
                method: "POST",
                headers: { "Content-Type": "application/json",},
                body: JSON.stringify({ name: name, email: email, cards: stringifiedCards})
            })
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <button onClick={saveCards}> Save List </button>
    )
}