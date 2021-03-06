import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { FIND_PERSON } from '../queries';

const Persons = ({ persons }) => {
    const [getPerson, result] = useLazyQuery(FIND_PERSON);
    const [person, setPerson] = useState(null);

    const showPerson = (name) => {
        getPerson({ variables: { nameToSearch: name } });
    }

    useEffect(() => {
        if (result.data) {
            setPerson(result.data.findPerson);
        }
    }, [result])

    if (person) {
        return (
            <div>
                <h2> {person.name} </h2>
                <div> {person.address.street} {person.address.city}  </div>
                <div> {person.phone} </div>
                <button onClick={() => setPerson(null)} > close </button>
            </div>
        );
    }

    return (
        <div>

            <h2>persons</h2>
            {
                persons.map((person) =>
                    <div key={person.id}>
                        {person.name} {person.phone}
                        <button onClick={() => showPerson(person.name)} >
                            show address
						</button>
                    </div>
                )
            }

        </div>
    );
}


export default Persons;