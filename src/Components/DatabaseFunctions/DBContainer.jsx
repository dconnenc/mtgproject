import { GetDBCards } from "./GetDBCards"
import { PostCards } from "./PostCards"
import { DBList } from "./DBList"

export const DBContainer = ({ cards, setCards, setUserDBCards, userDBCards }) => {
    return(
        <div id="profile-container">
            <h1>Fetch a list here!</h1>
                <div className=".container">
                    <div className="row">
                        <PostCards cards={cards}/>
                    </div>
                    <div className="row">
                        <GetDBCards setUserDBCards={setUserDBCards} />
                        <DBList userDBCards={userDBCards} setCards={setCards}/>
                    </div>
                </div>
        </div>
    )
}
