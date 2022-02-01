const App = () => {
	const course = {
		id: 1,
		name: "Half Stack application development",
		parts: [
			{
				name: "Fundamentals of React",
				exercises: 10,
				id: 1,
			},
			{
				name: "Using props to pass data",
				exercises: 7,
				id: 2,
			},
			{
				name: "State of a component",
				exercises: 14,
				id: 3,
			},
		],
	};

	return <Course course={course} />;
};
export default App;

const Course = (props) => {
	return (
		<div>
			<Header text={props.course.name} />
			<Content parts={props.course.parts} />
			<Sum parts={props.course.parts} />
		</div>
	);
};

const Header = (props) => <h1>{props.text}</h1>;

const Content = ({ parts }) => {
	const lines = parts.map((part) => {
		return (
			<Part
				name={part.name}
				exercises={part.exercises}
				id={part.id}
				key={part.id}
			/>
		);
	});

	return <ul>{lines}</ul>;
};

const Part = (props) => {
	return (
		<li>
			{props.name} {props.exercises}
		</li>
	);
};

const Sum = ({ parts }) => {
	const sum = parts.reduce((sum, x) => sum + x.exercises, 0);

	return (
		<p>
			<b>total of {sum} exercises</b>
		</p>
	);
};
