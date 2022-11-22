import { Link } from "react-router-dom";

export const LoadDBCards = ({userDBCards, user}) => {
    return(
    <>
        <Link to={`/profile/${user.id}/${userDBCards.list}`}><button className="button button-good">Load</button></Link>
    </>
    )
}