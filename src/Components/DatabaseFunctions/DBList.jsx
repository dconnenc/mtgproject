import React from 'react';

export const DBList = (userDBCards) => {
    
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
                    {/*userDBCards.map(userDBCards => 
                        <tr>
                            <td>{userDBCards.id}</td>
                            <td>Load</td>
                            <td>Edit</td>
                            <td>Delete</td>
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