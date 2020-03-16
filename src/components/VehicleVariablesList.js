import React from 'react'
import { Link, useRouteMatch } from "react-router-dom";

export const VehicleVariablesList = (props) => {
    let match = useRouteMatch();
    
    const {
        message,
        results,
    } = props;

    return (
        <section className="vehicle-variables-list">
            <h2>Vehicle variables</h2>
            {message && <h3>{message}</h3>}

            {results && results.length > 0
                &&
                <table className="vehicle-variables-list__table">
                    <thead>
                        <tr>
                            <th>Argument</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map(item =>
                            <tr key={item.ID}>
                                <td><Link to={`${match.url}/${item.ID}`} >{item.Name}</Link></td>
                                <td><div dangerouslySetInnerHTML={{ __html: item.Description }} /></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            }
        </section>
    )
}
