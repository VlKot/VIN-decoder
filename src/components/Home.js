import React, { useReducer } from 'react'
import { SearchVIN } from './SearchVIN'
import { PrevoiusRequests } from './PreviousRequests'
import { Context, reducer, initialState } from '../common/store'

export const Home = () => {
    const [store, dispatch] = useReducer(reducer, initialState);

    return (
        <article>
            <Context.Provider value={{ store, dispatch }}>
                {/* list previous 5 VIN requests*/}
                <PrevoiusRequests />
                <hr/>
                {/* search VIN params form  */}
                <SearchVIN />
            </Context.Provider >
        </article>
    )
}