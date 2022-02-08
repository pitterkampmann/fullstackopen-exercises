const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

var morgan = require("morgan");

app.use(
	morgan(function (tokens, req, res) {
		return [
			tokens.method(req, res),
			tokens.url(req, res),
			tokens.status(req, res),
			tokens.res(req, res, "content-length"),
			"-",
			tokens["response-time"](req, res),
			"ms",
			JSON.stringify(req.body),
		].join(" ");
	})
);

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

	const filter = persons.filter((p) => p.name === person.name);
	if (filter.length > 0) response.status(409).end("name must be unique");
	if (!person.name || !person.number) {
		response.status(400).end("name and number cannot be empty");
	}
	if (filter.length === 0 && person.name && person.number) {
		persons.push(person);
		response.json(person);
	}
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
