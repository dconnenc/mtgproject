import { DeleteDBCards } from "./DeleteDBCards"
import { GetDBCards } from "./GetDBCards"
import { PostCards } from "./PostCards"
import { UpdateDBCards } from "./UpdateDBCards"
export const ProfileContainer = (cards, setCards) => {
    return(
        <div id="profile-container">
            <h1>Or retrieve a list here!</h1>
            <PostCards cards={cards}/> 
            <GetDBCards setCards={setCards}/>
            <UpdateDBCards />
            <DeleteDBCards />
        </div>
    )
}