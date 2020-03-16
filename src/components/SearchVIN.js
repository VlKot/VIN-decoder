import React, { useState, useEffect, useContext, useRef } from 'react'
import { Preloader } from '../common/Preloader';
import { useParams } from 'react-router-dom';
import { Context } from '../common/store';
import '../assets/styles.css'

export const SearchVIN = () => {
    let { id } = useParams();

    const [vin, setVin] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isAllowSubmit, setAllowSubmit] = useState(false);
    const [error, setError] = useState("");
    const [response, setResponse] = useState({});
    const inputEl = useRef(null);
    const { dispatch } = useContext(Context);

    //method of change and check string as VIN-code
    const fixValue = (value) => {
        let _value;
        //regular expression checking for forbidden characters
        _value = value.replace(/[^a-z0-9]/gi, '');

        //check VIN length
        let result = (_value.length > 17)
            ? _value.slice(0, 16)
            : _value;

        return result;
    }


    const handleChange = (e) => {
        const fixedValue = fixValue(e);
        // allow to submit with the correct VIN length
        setAllowSubmit(fixedValue.length === 17 ? true : false);

        setVin(fixedValue);
    }

    //hook to update form input from previous requests
    useEffect(() => {
        if (id && id.length === 17) {
            setAllowSubmit(true);
            setResponse({});
            inputEl.current.value = id;
            setVin(id);
            fetchData(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${id}?format=json`);
        }

    }, [id]);

    //form submit
    const submitVIN = e => {
        e && e.preventDefault();
        fetchData(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vin}?format=json`);

        //update store
        dispatch({ type: "add", value: vin });

    };

    const fetchData = async (_url) => {
        try {
            if (isLoading) return;
            setIsLoading(true);
            const res = await fetch(_url);
            const json = await res.json();
            setResponse(json);
        } catch (error) {
            setError(error);
            console.error(error);
        }
        setIsLoading(false);
    };


    const {
        Results,
        Message
    } = response;

    return (
        <section className="search-vin">

            <h2>VIN decoder</h2>
            <form className="submit-form" onSubmit={submitVIN}>
                <input
                    type="text"
                    name="vin"
                    className="submit-form__input"
                    placeholder="enter VIN-code"
                    value={vin}
                    ref={inputEl}
                    onChange={(e) => handleChange(e.target.value)}
                />
                <button className="submit-form__button" disabled={isLoading || !isAllowSubmit}>Submit</button>
            </form>

            {Message && <h3>{Message}</h3>}
            {error && <h3>{error}</h3>}
            {isLoading && <Preloader />}

            {Results && Results.length > 0 &&
                <table className="search-vin__table">
                    <thead>
                        <tr>
                            <th>Argument</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Results.map((item, index) =>
                            item.Value
                                ?
                                //used `index` because item.VariableId not unique in array
                                <tr key={index}>
                                    <td>{item.Variable}</td>
                                    <td>{item.Value}</td>
                                </tr>
                                :
                                null
                        )}
                    </tbody>
                </table>
            }
        </section>
    )
}