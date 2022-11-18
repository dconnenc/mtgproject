import { Link } from "react-router-dom";

export const LoadDBCards = ({userDBCards, user}) => {
    return(
    <>
        <Link to={`/profile/${user.id}/${userDBCards.list}`}><button className="btn btn-success">Load</button></Link>
    </>
    )
}