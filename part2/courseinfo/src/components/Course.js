const Course = ({ course }) => {
	return (
		<div>
			<Header text={course.name} />
			<Content parts={course.parts} />
			<Sum parts={course.parts} />
		</div>
	);
};
export default Course;

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
