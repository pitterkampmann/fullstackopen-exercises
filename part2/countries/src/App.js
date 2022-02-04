import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
	const [countries, setCountries] = useState([]);
	const [search, setSearch] = useState("");
	const [filtered, setFiltered] = useState([]);

	useEffect(() => {
		axios.get("https://restcountries.com/v3.1/all").then((response) => {
			setCountries(response.data);
		});
	}, []);

	const handleSearch = (e) => {
		console.log(e);
		setSearch(e);
	};

	useEffect(() => {
		const filteredCountries = countries.filter((c) => {
			return c.name.common.toLowerCase().includes(search.toLowerCase());
		});
		setFiltered(filteredCountries);
	}, [search]);

	return (
		<div>
			<Filter
				countries={countries}
				handleSearch={(e) => handleSearch(e.target.value)}
				search={search}
			/>
			<Countries
				countries={filtered}
				handleSelectCountry={(e) => handleSearch(e)}
			/>
		</div>
	);
};

export default App;

const Filter = (props) => {
	return (
		<div>
			find countries{" "}
			<input onChange={props.handleSearch} value={props.search} />
		</div>
	);
};

const Countries = ({ countries, handleSelectCountry }) => {
	const handleSelect = (e) => {
		handleSelectCountry(e);
	};
	if (countries.length <= 10) {
		const list = countries.map((country) => {
			return (
				<Country
					key={country.cca2}
					country={country}
					show={countries.length === 1}
					handleSelect={(e) => handleSelect(e)}
				/>
			);
		});
		return <>{list}</>;
	} else {
		return <p>Too many matches, specify another filter </p>;
	}
};

const Country = ({ country, show, handleSelect }) => {
	if (show) {
		return (
			<div>
				<h2>{country.name.common}</h2>
				<p>capital {country.capital[0]}</p>
				<p>population {country.population}</p>
				<Languages languages={Object.values(country.languages)} />
				<img src={country.flags.png} />
			</div>
		);
	}
	return (
		<>
			<li>
				{country.name.common}
				<button onClick={() => handleSelect(country.name.common)}>show</button>
			</li>
		</>
	);
};

const Languages = ({ languages }) => {
	const list = languages.map((l) => {
		return <li>{l}</li>;
	});

	return (
		<div>
			<h3>Languages</h3>
			<ul>{list}</ul>
		</div>
	);
};
