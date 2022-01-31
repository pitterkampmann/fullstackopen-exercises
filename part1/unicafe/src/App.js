import React, { useState } from "react";

const Statistics = (props) => {
	const good = props.good;
	const bad = props.bad;
	const neutral = props.neutral;
	if (good + bad + neutral === 0) {
		return <p>No feedback given</p>;
	}
	return (
		<div>
			<h1>statistics</h1>
			<StatisticsLine name="Good" value={good} />
			<StatisticsLine name="Neutral" value={neutral} />
			<StatisticsLine name="Bad" value={bad} />
			<StatisticsLine name="All" value={good + bad + neutral} />
			<StatisticsLine
				name="Average"
				value={(good - bad) / (good + bad + neutral)}
			/>
			<StatisticsLine name="Positive" value={good / (good + bad + neutral)} />
		</div>
	);
};

const Button = (props) => {
	return <button onClick={props.handleClick}>{props.text}</button>;
};

const StatisticsLine = (props) => {
	return (
		<p>
			{props.name}:{props.value}
		</p>
	);
};

const App = () => {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	const handleGood = () => setGood(good + 1);
	const handleBad = () => setBad(bad + 1);
	const handleNeutral = () => setNeutral(neutral + 1);

	return (
		<div>
			<div>
				<h1>give feedback</h1>
				<Button handleClick={handleGood} text={"good"} />
				<Button handleClick={handleNeutral} text={"neutral"} />
				<Button handleClick={handleBad} text={"bad"} />
			</div>
			<Statistics good={good} bad={bad} neutral={neutral} />
		</div>
	);
};

export default App;
