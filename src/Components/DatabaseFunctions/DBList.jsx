import React from 'react';
import { useEffect } from 'react';
import { DeleteDBCards } from './DeleteDBCards';
import { LoadDBCards } from './LoadDBCards';

export const DBList = ({userDBCards, setCards, setComparisonCards, user}) => {
   
    useEffect(()=> {

    }, [])
    
    let cardsArray = userDBCards.cards
    return (
        <div className=".container">
            <table className="table">
                <thead> 
                <tr>
                    <th>Description</th>
                    <th>Load</th>
                    <th>Delete</th>
                </tr>   
                </thead>
                <tbody>
                   {cardsArray ? cardsArray.map(userDBCards => 
                                <tr key={userDBCards.id}>
                                    <td>{userDBCards.list}</td>
                                    <td><LoadDBCards
                                            user={user}   
                                            setCards={setCards} 
                                            setComparisonCards={setComparisonCards} 
                                            userDBCards={userDBCards}
                                        />
                                    </td>
                                    <td><DeleteDBCards 
                                        id={userDBCards.user_id} 
                                        list={userDBCards.list}
                                        />
                                    </td>
                                </tr>
                                    
                    ): <tr></tr> }
                </tbody>
            </table>
        </div>
    )
}