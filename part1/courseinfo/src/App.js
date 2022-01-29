import React from "react";

const App = () => {
	const course = "Half Stack application development";
	const part1 = {
		name: "Fundamentals of React",
		exercises: 10,
	};
	const part2 = {
		name: "Using props to pass data",
		exercises: 7,
	};
	const part3 = {
		name: "State of a component",
		exercises: 14,
	};

	return (
		<div>
			<Header course={course} />
			<Content part1={part1} part2={part2} part3={part3} />
			<Total
				text={
					"Number of exercises " +
					Number(part1.exercises + part2.exercises + part3.exercises)
				}
			/>
		</div>
	);
};

export default App;

export const Header = ({ course }) => {
	return <h1>{course}</h1>;
};

const Content = ({ part1, part2, part3 }) => {
	return (
		<div>
			<Part part={part1.name} exercise={part1.exercise} />
			<Part part={part2.name} exercise={part2.exercise} />
			<Part part={part3.name} exercise={part3.exercise} />
		</div>
	);
};

const Total = ({ text }) => {
	return <p>{text}</p>;
};

const Part = ({ part, exercise }) => {
	return (
		<p>
			{part} {exercise}
		</p>
	);
};