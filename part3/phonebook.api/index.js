const express = require("express");
const app = express();
app.use(express.json());

let persons = [
	{
		id: 1,
		name: "Arto Hellas",
		number: "040-123456",
	},
	{
		id: 2,
		name: "Ada Lovelace",
		number: "39-44-5323523",
	},
	{
		id: 3,
		name: "Dan Abramov",
		number: "12-43-234345",
	},
	{
		id: 4,
		name: "Mary Poppendieck",
		number: "39-23-6423122",
	},
];

app.get("/", (request, response) => {
	response.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (request, response) => {
	response.json(persons);
});

app.delete("/api/persons/:id", (request, response) => {
	const id = Number(request.params.id);

	persons = persons.filter((p) => p.id != id);
	console.log(persons);
	response.status(204).end();
});

app.get("/api/persons/:id", (request, response) => {
	const id = Number(request.params.id);

	const person = persons.find((p) => p.id === id);
	response.json(person);
});

app.get("/api/persons/info", (request, response) => {
	const sum = persons.length;

	response.writeHead(200, { "Content-Type": "text/plain" });
	response.end(`Phonebook has info for ${sum} people\n ${new Date()}`);
});

app.post("/api/persons", (request, response) => {
	const person = {
		...request.body,
		id: (Math.random() * (100000 - 5) + 5).toFixed(),
	};
	persons.push(person);
	response.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
