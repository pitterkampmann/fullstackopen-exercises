import React, { useState } from "react";

const App = () => {
	const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
	const [newName, setNewName] = useState("");

	const templateFn = (newName) => `${newName} is already added to phonebook`;

	const handleNameChange = (event) => {
		setNewName(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(event.target.value);

		const newPerson = {
			name: newName,
		};

		var teste = persons.filter((p) => p.name === newPerson.name);
		if (teste.length > 0) {
			alert(templateFn(newName));
		} else {
			setPersons(persons.concat(newPerson));
			setNewName("");
		}
	};

	const list = persons.map((p) => {
		return <li key={p.name}>{p.name}</li>;
	});

	return (
		<div>
			<h2>Phonebook</h2>
			<form onSubmit={handleSubmit}>
				<div>
					name: <input value={newName} onChange={handleNameChange} />
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
