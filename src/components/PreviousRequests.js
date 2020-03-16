import React, { useEffect, useContext } from 'react'
import { Context } from '../common/store';
import { Link } from 'react-router-dom';

export const PrevoiusRequests = () => {
    const { store, dispatch } = useContext(Context);

    useEffect(() => {
        dispatch({ type: "get" });
    }, [])

    return (
        <section className="prevoius-requests">
            {store.previous &&
                <>
                    <h2>Prevoius VIN requests</h2>

                    {store.previous.map((item, index) =>
                        <div key={index}>
                            <Link to={`/${item}`} className="prevoius-requests__link">{item}</Link>
                        </div>
                    )}
                </>
            }
        </section>
    )
}