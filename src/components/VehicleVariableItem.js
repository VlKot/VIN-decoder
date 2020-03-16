import React from 'react'

export const VehicleVariableItem = (props) => {

    const {
        resultItem,
        message,
        id
    } = props;

    return (
        <section className="vehicle-variable-item">
            <h2>Vehicle variable description</h2>
            {message && resultItem && <h3>{message}</h3>}
            <div className="vehicle-variable-item__resultItem">
                {resultItem
                    ? <>
                        {resultItem && resultItem.Name && <h3>Name: {resultItem.Name}</h3>}
                        <div dangerouslySetInnerHTML={{ __html: resultItem.Description }} />
                    </>
                    : message && <h3>Vehicle variable `{id}` incorrect</h3>
                }
            </div>
        </section>
    )
}