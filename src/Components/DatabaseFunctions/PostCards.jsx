//Currently getting a CORS error, and data being transfered is too large.  
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";

export const PostCards = ( {cards} ) => {
    const [description, setDescription] = useState('')
    const { user } = useAuth0();
    
    
    const onSubmitForm = async e => {
        e.preventDefault();
        
        const name = `${user.given_name} ${user.family_name}`
        const email = user.email
        const stringifiedCards = JSON.stringify(cards);

        try {
            await fetch("http://localhost:3001/usersCards", {
                method: "POST",
                headers: { "Content-Type": "application/json",},
                body: JSON.stringify({ name: name, email: email, cards: stringifiedCards, listName: description })
            })
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <div>
            <form className="d-flex mt-5" onSubmit={onSubmitForm}>
                <input
                    type="text"
                    className="form-control"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <button className="btn btn-success">Save</button>
            </form>
        </div>
    )
}