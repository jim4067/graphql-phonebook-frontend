import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ALL_PERSONS, CREATE_PERSON } from '../queries';


const PersonForm = ({ setError }) => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");

    const [createPerson] = useMutation(CREATE_PERSON, {
        refetchQueries: [{ query: ALL_PERSONS }],
        onError: (error) => {
            setError(error.graphQLErrors[0].message);
        }
    });

    const submit = (event) => {
        event.preventDefault();

        createPerson({ variables: { name, phone, street, city } });

        setName("");
        setPhone("");
        setStreet("");
        setCity("");
    }


    return (
        <div>

            <h2>create new</h2>
            <form onSubmit={submit} >
                <div>
                    <input placeholder='name'
                        value={name}
                        onChange={({ target }) => setName(target.value)}
                    />
                </div>
                <div>
                    <input placeholder='phone'
                        value={phone}
                        onChange={({ target }) => setPhone(target.value)}
                    />
                </div>
                <div>
                    <input placeholder='sreet'
                        value={street}
                        onChange={({ target }) => setStreet(target.value)}
                    />
                </div>
                <div>
                    <input placeholder='city'
                        value={city}
                        onChange={({ target }) => setCity(target.value)}
                    />
                </div>
                <button type='submit' > add! </button>

            </form>

        </div>
    );
}

export default PersonForm;