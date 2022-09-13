import { DeleteDBCards } from "./DeleteDBCards"
import { GetDBCards } from "./GetDBCards"
import { PostCards } from "./PostCards"
import { UpdateDBCards } from "./UpdateDBCards"
import { DBList } from "./DBList"
import { useState } from "react"

export const DBContainer = ( cards, setCards ) => {
    const [userDBCards, setUserDBCards] = useState([]);

    return(
        <div id="profile-container">
            <h1>Or retrieve a list here!</h1>
                <div className=".container">
                    <div className="row">
                        <PostCards cards={cards}/> 
                    </div>
                    <div className="row">
                        <DBList userDBCards={userDBCards}/>
                        <GetDBCards setUserDBCards={setUserDBCards} />
                        <UpdateDBCards />
                        <DeleteDBCards />
                    </div>
                </div>
        </div>
    )
}