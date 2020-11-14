import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const CREATE_PERSON = gql`
    mutation createPerson($name: String!, $street: String!, $city: String!, $phone: String){
        addPerson(
            name: $name
            street: $street
            city: $city
            phone: $phone
        ) {
            name
            phone
            id
            address{
                street
                city
            }
        }
    }
`;

const PersonForm = () => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");

    const [createPerson] = useMutation(CREATE_PERSON);

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
                        onChange={({ target }) => setStreet(target.value)}
                    />
                </div>
                <button type='submit' > add! </button>

            </form>

        </div>
    );
}

export default PersonForm;