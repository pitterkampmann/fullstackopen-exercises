import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
	const [countries, setCountries] = useState([]);
	const [search, setSearch] = useState("");
	const [filtered, setFiltered] = useState([]);
	const [weather, setWeather] = useState();
	const [selectedCountry, setSelectedCountry] = useState();
	const [capital, setCapital] = useState();

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

		if (filteredCountries.length === 1) {
			setSelectedCountry(filteredCountries[0]);
		} else {
			setSelectedCountry();
			setWeather();
			setCapital();
		}
	}, [search]);

	useEffect(() => {
		if (selectedCountry)
			axios
				.get(
					`http://api.openweathermap.org/geo/1.0/direct?q=${selectedCountry?.capital},,${selectedCountry?.cca2}&limit=1&appid=${process.env.REACT_APP_API_KEY}`
				)
				.then((response) => {
					setCapital(response.data[0]);
				});
	}, [selectedCountry]);

	useEffect(() => {
		if (capital)
			axios
				.get(
					`http://api.openweathermap.org/data/2.5/weather?lat=${capital?.lat}&lon=${capital?.lon}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
				)
				.then((response) => {
					console.log(response);
					setWeather(response.data);
				});
	}, [capital]);

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
			<CountryDetails country={selectedCountry} />
			<Weather weather={weather} capital={capital} />
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
	if (countries.length > 1 && countries.length <= 10) {
		const list = countries.map((country) => {
			return (
				<li key={country.cca2}>
					{country.name.common}
					<button onClick={() => handleSelectCountry(country.name.common)}>
						show
					</button>
				</li>
			);
		});
		return <>{list}</>;
	} else {
		return <p>Too many matches, specify another filter </p>;
	}
};

const CountryDetails = ({ country }) => {
	if (country)
		return (
			<div>
				<h2>{country.name.common}</h2>
				<p>capital {country.capital[0]}</p>
				<p>population {country.population}</p>
				<Languages languages={Object.values(country.languages)} />
				<img src={country.flags.png} alt={country.name.common} />
			</div>
		);
	return <></>;
};

const Languages = ({ languages }) => {
	console.log(languages);
	const list = languages.map((l) => {
		return <li key={l}>{l}</li>;
	});

	return (
		<div>
			<h3>Languages</h3>
			<ul>{list}</ul>
		</div>
	);
};

const Weather = ({ weather, capital }) => {
	if (weather) {
		console.log("weather", weather);
		return (
			<div>
				<h3>Weather in {capital?.name}</h3>
				<p>Temperature {weather?.main?.temp}º celsius</p>
				<p>Wind {weather?.wind?.speed}km/h</p>
			</div>
		);
	}
	return <></>;
};
