import React from 'react';
import { DeleteDBCards } from './DeleteDBCards';

export const DBList = ({userDBCards}) => {
    
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
                        <tr>
                            <td>{userDBCards.name}</td>
                            <td>Load</td>
                            <td>Edit</td>
                            <td><DeleteDBCards id={userDBCards.id}/></td>
                        </tr>    
                    )}
                {/*
                <tr>
                    <td>Mary</td>
                    <td>Moe</td>
                    <td>mary@example.com</td>
                </tr>
                */}
                </tbody>
            </table>

        </div>
    )
}