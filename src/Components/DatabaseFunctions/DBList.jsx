import React from 'react';
import { DeleteDBCards } from './DeleteDBCards';
import { LoadDBCards } from './LoadDBCards';

export const DBList = ({userDBCards, setCards, setComparisonCards}) => {
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
                   {console.log(cardsArray, typeof cardsArray)} 
                   {cardsArray ? cardsArray.map(userDBCards => 
                                <tr key={userDBCards.id}>
                                    <td>{userDBCards.list}</td>
                                    <td><LoadDBCards   
                                            setCards={setCards} 
                                            setComparisonCards={setComparisonCards} 
                                            cards={userDBCards.cards}/>
                                    </td>
                                    <td><DeleteDBCards id={userDBCards.user_id} description={userDBCards.list}/></td>
                                </tr>
                                    
                    ): <tr></tr> }
                </tbody>
            </table>
        </div>
    )
}