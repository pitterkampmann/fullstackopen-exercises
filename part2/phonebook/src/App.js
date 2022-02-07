import React, { useState, useEffect } from "react";
import personService from "./services/persons";

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
			personService.create(newPerson).then((response) => {
				console.log(response);
				personService.getAll();
			});
		}
	};

	const filtered = persons.filter((p) => {
		return p.name.toLowerCase().includes(search.toLowerCase());
	});

	const getPersons = () => {
		personService.getAll().then((response) => {
			setPersons(response.data);
		});
	};
	useEffect(() => {
		getPersons();
	}, []);

	const handleDelete = (e) => {
		if (window.confirm(`Delete ${e.name}?`)) {
			console.log(e);
			personService.remove(e.id).then(() => {
				getPersons();
			});
		}
	};
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
			<Persons persons={filtered} handleDelete={handleDelete} />
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

const Persons = ({ persons, handleDelete }) => {
	const list = persons.map((p) => {
		return <Person key={p.name} person={p} handleDelete={handleDelete} />;
	});

	return (
		<div>
			<ul>{list}</ul>
		</div>
	);
};

const Person = ({ person, handleDelete }) => {
	return (
		<li>
			{person.name} {person.number}
			<button onClick={() => handleDelete(person)}>delete</button>
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
