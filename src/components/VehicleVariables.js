import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Preloader } from '../common/Preloader';
import { VehicleVariablesList } from './VehicleVariablesList';
import { VehicleVariableItem } from './VehicleVariableItem';

export const VehicleVariables = () => {
    let { id } = useParams();

    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState({});
    const [error, setError] = useState("");

    useEffect(() => {
        setIsLoading(true)

        try {
            async function fetchData() {
                const result = await fetch('https://vpic.nhtsa.dot.gov/api/vehicles/getvehiclevariablelist?format=json');
                const json = await result.json();
                setResponse(json);
                setIsLoading(false);
            }
            fetchData();
        } catch (error) {
            setError(error);
            console.error(error);
        }

    }, [])

    const {
        Message,
        Results
    } = response;

    //get element if param "id" is used
    const resultItem = Results && Results.find(item => item.ID === parseInt(id));

    return (
        <section className="vehicle-variables">
            {id
                ?
                <VehicleVariableItem
                    message={Message}
                    resultItem={resultItem}
                    id={id}
                />
                :
                <VehicleVariablesList
                    message={Message}
                    results={Results}
                />
            }
            {isLoading && <Preloader />}
            {error && <h3>{error}</h3>}

        </section>
    )
}