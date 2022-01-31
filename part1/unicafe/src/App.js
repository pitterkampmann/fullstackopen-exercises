import React, { useState } from "react";

const Statistics = (props) => {
	const good = props.good;
	const bad = props.bad;
	const neutral = props.neutral;
	return (
		<div>
			<h1>statistics</h1>
			<p>Good: {good}</p>
			<p>Neutral: {neutral}</p>
			<p>Bad: {bad}</p>
			<p>All: {good + bad + neutral}</p>
			<p>Average: {(good - bad) / (good + bad + neutral)}</p>
			<p>Positive: {(good / (good + bad + neutral)) * 100 + "%"}</p>
		</div>
	);
};

const App = () => {
	// save clicks of each button to its own state
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
				<button onClick={handleGood}>good</button>
				<button onClick={handleNeutral}>neutral</button>
				<button onClick={handleBad}>bad</button>
			</div>
			<Statistics good={good} bad={bad} neutral={neutral} />
		</div>
	);
};

export default App;
