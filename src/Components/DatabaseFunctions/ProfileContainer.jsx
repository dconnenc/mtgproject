import { DeleteDBCards } from "./DeleteDBCards"
import { GetDBCards } from "./GetDBCards"
import { PostCards } from "./PostCards"
import { UpdateDBCards } from "./UpdateDBCards"
export const ProfileContainer = (cards) => {
    return(
        <div>
            <PostCards cards={cards}/> 
            <GetDBCards />
            <UpdateDBCards />
            <DeleteDBCards />
        </div>
    )
}