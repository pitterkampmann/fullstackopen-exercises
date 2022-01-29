import React from "react";

const App = () => {
	const course = "Half Stack application development";
	const parts = [
		{
			name: "Fundamentals of React",
			exercises: 10,
		},
		{
			name: "Using props to pass data",
			exercises: 7,
		},
		{
			name: "State of a component",
			exercises: 14,
		},
	];

	return (
		<div>
			<Header course={course} />
			<Content parts={parts} />
			<Total parts={parts} />
		</div>
	);
};

export default App;

export const Header = ({ course }) => {
	return <h1>{course}</h1>;
};

const Content = ({ parts }) => {
	return (
		<div>
			<Part part={parts[0].name} exercise={parts[0].exercises} />
			<Part part={parts[1].name} exercise={parts[1].exercises} />
			<Part part={parts[2].name} exercise={parts[2].exercises} />
		</div>
	);
};

const Total = ({ parts }) => {
	return (
		<p>
			{"Number of exercises " +
				Number(parts[0].exercises + parts[1].exercises + parts[2].exercises)}
		</p>
	);
};

const Part = ({ part, exercise }) => {
	return (
		<p>
			{part} {exercise}
		</p>
	);
};
