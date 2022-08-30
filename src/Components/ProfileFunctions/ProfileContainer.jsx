import { DeleteCards } from "./DeleteCards"
import { GetCards } from "./GetCards"
import { PostCards } from "./PostCards"
import { UpdateCards } from "./UpdateCards"
export const ProfileContainer = (cards) => {
    return(
        <div>
            <PostCards cards={cards}/> 
            <GetCards />
            <UpdateCards />
            <DeleteCards />
        </div>
    )
}