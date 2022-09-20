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
                        <div className="col-3">
                            <GetDBCards setUserDBCards={setUserDBCards} />
                        </div>
                        <div className="col-9">
                            <DBList userDBCards={userDBCards} setCards={setCards}/>
                        </div>
                    </div>
                </div>
        </div>
    )
}
