import React from 'react';


const Persons = ({ persons }) => {

    return (
        <div>

            <h2>persons</h2>
            {
                persons.map((person) =>
                    <div key={person.id}>
                        {person.name} {person.phone}
                    </div>
                )
            }

        </div>
    );
}

export default Persons;