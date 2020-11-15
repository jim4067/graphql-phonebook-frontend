import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';

import { EDIT_NUMBER } from '../queries';

const PhoneForm = ({ notify }) => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    const [changeNumber, result] = useMutation(EDIT_NUMBER);

    //event handler for submitting the form
    const submit = (event) => {
        event.preventDefault();

        changeNumber({ varibles: { name, phone } });
        console.log("the name contains", name)
        console.log("the phone contains", phone)

        setName("");
        setPhone("");
    }

    useEffect(() => {
        if (result.data && result.data.editNumber === null) {
            notify("Person not found");
        }
    }, [result.data]); //eslint-disable-line

    return (
        <div>

            <h2>change number</h2>
            <form onSubmit={submit}>
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
                <button type='submit' >change</button>
            </form>

        </div>
    );
}

export default PhoneForm;