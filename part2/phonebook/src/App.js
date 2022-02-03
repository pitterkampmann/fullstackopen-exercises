import React, { useState } from "react";

const App = () => {
	const [persons, setPersons] = useState([
		{ name: "Arto Hellas", number: "040-123456", id: 1 },
		{ name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
		{ name: "Dan Abramov", number: "12-43-234345", id: 3 },
		{ name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
	]);

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
		};

		var teste = persons.filter((p) => p.name === newPerson.name);
		if (teste.length > 0) {
			alert(templateFn(newName));
		} else {
			setPersons(persons.concat(newPerson));
			setNewName("");
			setNewNumber("");
		}
	};

	const filtered = persons.filter((p) => {
		return p.name.toLowerCase().includes(search.toLowerCase());
	});

	const list = filtered.map((p) => {
		return (
			<li key={p.name}>
				{p.name} {p.number}
			</li>
		);
	});

	return (
		<div>
			<h2>Phonebook</h2>
			<div>
				filter shown with:{" "}
				<input value={search} onChange={handleSearchChange} />
			</div>
			<h2>Add New</h2>
			<form onSubmit={handleSubmit}>
				<div>
					name: <input value={newName} onChange={handleNameChange} />
				</div>
				<div>
					number: <input value={newNumber} onChange={handleNumberChange} />
				</div>

				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			<ul>{list}</ul>
		</div>
	);
};

export default App;
