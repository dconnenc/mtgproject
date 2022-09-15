import React from 'react';
import { DeleteDBCards } from './DeleteDBCards';
import { LoadDBCards } from './LoadDBCards';

export const DBList = ({userDBCards, setCards}) => {
    
    return (
        <div className=".container">
            <table className="table">
                <thead> 
                <tr>
                    <th>Description</th>
                    <th>Load</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                   {userDBCards.map(userDBCards => 
                                <tr key={userDBCards.id}>
                                    <td>{userDBCards.listname}</td>
                                    <td><LoadDBCards setCards={setCards} id={userDBCards.id}/></td>
                                    <td>Edit</td>
                                    <td><DeleteDBCards id={userDBCards.id}/></td>
                                </tr>    
                    )}
                </tbody>
            </table>

        </div>
    )
}