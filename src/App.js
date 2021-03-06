import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import PhoneForm from './components/PhoneForm';

import { ALL_PERSONS } from './queries';

const Notify = ({ errorMessage }) => {
	if (!errorMessage) {
		return null;
	}

	return (
		<div style={{ color: 'red' }}  >
			{errorMessage}
		</div>
	);
}

const App = () => {
	const [errorMessage, setErrorMessage] = useState(null);

	const result = useQuery(ALL_PERSONS,/* {
		the code below makes endless queries when a new person is added
		pollInterval: 2000
	} */ );

	const notify = (message) => {
		setErrorMessage(message);
		setTimeout(() => {
			setErrorMessage(null);
		}, 1000)
	}


	if (result.loading) {
		return <div>loading...</div>
	}


	return (
		<div>
			<Notify errorMessage={errorMessage} />
			<Persons persons={result.data.allPersons} />
			<PersonForm setError={notify} />
			<PhoneForm notify={notify} />
		</div>
	);
}

export default App;