import { useState } from "react";

export const PostCards = ({ cards, user }) => {
    const [description, setDescription] = useState('')
    
    //hits the node.js file on the backend
    const postDBCards = async e => {
        e.preventDefault();

        try {
            await fetch(`http://localhost:3001/usersCards/${user.id}/${description}`, {
                method: "POST",
                headers: { "Content-Type": "application/json",},
                body: JSON.stringify({ cards })
            })
            .then(response => response.json())
            .then(json => console.log(json));
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <div>
            <form className="d-flex mt-5" onSubmit={postDBCards}>
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