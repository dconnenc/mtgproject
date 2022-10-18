import { GetDBCards } from "./GetDBCards"
import { PostCards } from "./PostCards"
import { DBList } from "./DBList"

export const DBContainer = ({ user, cards, setCards, setUserDBCards, userDBCards, setComparisonCards }) => {

    return(
        <div id="profile-container">
            <h1>Fetch a list here!</h1>
                <div className=".container">
                    <div className="row">
                        <PostCards 
                            cards={cards}
                            user={user}
                        />
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <GetDBCards 
                                setUserDBCards={setUserDBCards} 
                                user={user}
                            />
                        </div>
                        <div className="col-9">
                            <DBList 
                                user={user}
                                userDBCards={userDBCards} 
                                setCards={setCards} 
                                setComparisonCards={setComparisonCards}
                            />
                        </div>
                    </div>
                </div>
        </div>
    )
}
