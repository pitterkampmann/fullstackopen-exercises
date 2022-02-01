const App = () => {
	const courses = [
		{
			name: "Half Stack application development",
			id: 1,
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
				{
					name: "Redux",
					exercises: 11,
					id: 4,
				},
			],
		},
		{
			name: "Node.js",
			id: 2,
			parts: [
				{
					name: "Routing",
					exercises: 3,
					id: 1,
				},
				{
					name: "Middlewares",
					exercises: 7,
					id: 2,
				},
			],
		},
	];

	const displayCourses = courses.map((course) => {
		console.log(course);
		return <Course course={course} />;
	});

	return <div>{displayCourses}</div>;
};
export default App;

const Course = ({ course }) => {
	return (
		<div>
			<Header text={course.name} />
			<Content parts={course.parts} />
			<Sum parts={course.parts} />
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
