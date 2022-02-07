import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [search, setSearch] = useState("");

	const templateFn = (newName) => `${newName} is already added to phonebook`;

	const handleNameChange = (event) => {
		setNewName(event.target.value);
	};

	const handleNumberChange = (event) => {
		setNewNumber(event.target.value);
	};

	const handleSearchChange = (event) => {
		setSearch(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(event.target.value);

		const newPerson = {
			name: newName,
			number: newNumber,
			id: persons.length + 1,
		};

		var teste = persons.filter((p) => p.name === newPerson.name);
		if (teste.length > 0) {
			alert(templateFn(newName));
		} else {
			setPersons(persons.concat(newPerson));
			setNewName("");
			setNewNumber("");
			axios
				.post(" http://localhost:3001/persons", newPerson)
				.then((response) => {
					console.log(response);
					getAll();
				});
		}
	};

	const filtered = persons.filter((p) => {
		return p.name.toLowerCase().includes(search.toLowerCase());
	});

	const getAll = () => {
		axios.get(" http://localhost:3001/persons").then((response) => {
			console.log(response);
			setPersons(response.data);
		});
	};

	useEffect(() => {
		getAll();
	}, []);

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter search={search} handleSearchChange={handleSearchChange} />
			<PersonForm
				handleSubmit={handleSubmit}
				newName={newName}
				handleNameChange={handleNameChange}
				newNumber={newNumber}
				handleNumberChange={handleNumberChange}
			/>
			<h3>Numbers</h3>
			<Persons persons={filtered} />
		</div>
	);
};

export default App;

const PersonForm = (props) => {
	return (
		<div>
			<h3>Add New</h3>
			<form onSubmit={props.handleSubmit}>
				<div>
					name:
					<input value={props.newName} onChange={props.handleNameChange} />
				</div>
				<div>
					number:
					<input value={props.newNumber} onChange={props.handleNumberChange} />
				</div>

				<div>
					<button type="submit">add</button>
				</div>
			</form>
		</div>
	);
};

const Persons = ({ persons }) => {
	const list = persons.map((p) => {
		return <Person key={p.name} name={p.name} number={p.number} />;
	});

	return (
		<div>
			<ul>{list}</ul>
		</div>
	);
};

const Person = ({ name, number }) => {
	return (
		<li>
			{name} {number}
		</li>
	);
};

const Filter = (props) => {
	return (
		<div>
			Filter shown with:{" "}
			<input value={props.search} onChange={props.handleSearchChange} />
		</div>
	);
};
