import { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ weatherData }) => (
  <div>
    <h1>Weather in {weatherData.name}</h1>
    <p>temperature {weatherData.main.temp} Celcius</p>
    <img
      src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
      alt="weather icon"
    />
    <p>wind {weatherData.wind.speed} m/s</p>
  </div>
);

const ListCountries = ({ countries, showCountry }) => (
  <div>
    {countries.map((country) => (
      <div key={country.cca2}>
        {country.name.common}
        <button onClick={() => showCountry(country.name.common)}>show</button>
      </div>
    ))}
  </div>
);

const CountryDetails = ({ country, weatherData }) => (
  <div>
    <h1>{country.name.common}</h1>
    <div>capital {country.capital[0]}</div>
    <div>area {country.area}</div>

    <h3>languages</h3>
    <ul>
      {Object.entries(country.languages).map(([code, language]) => (
        <li key={code}>{language}</li>
      ))}
    </ul>
    <img src={country.flags.png} alt={`flag of ${country.name.common}`} />
    <Weather weatherData={weatherData} />
  </div>
);

const Countries = ({ filteredCountries, showCountry, weatherData }) => {
  if (!filteredCountries) {
    return null;
  } else if (filteredCountries.length === 1 && weatherData) {
    return (
      <CountryDetails
        country={filteredCountries[0]}
        weatherData={weatherData}
      />
    );
  } else if (filteredCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (filteredCountries.length <= 10) {
    return (
      <ListCountries countries={filteredCountries} showCountry={showCountry} />
    );
  }
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("");
  const [filteredCountries, setFilteredCountries] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  useEffect(() => {
    const newFilteredCountries =
      country !== ""
        ? countries.filter((c) =>
            c.name.common.toLowerCase().includes(country.toLowerCase())
          )
        : null;

    setFilteredCountries(newFilteredCountries);
  }, [countries, country]);

  useEffect(() => {
    if (filteredCountries && filteredCountries.length === 1) {
      const capital = filteredCountries[0].capital[0];
      const apiKey = process.env.REACT_APP_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${apiKey}`;

      axios.get(url).then((response) => {
        setWeather(response.data);
      });
    } else {
      setWeather(null);
    }
  }, [filteredCountries]);

  const showCountry = (countryName) => {
    const choosenCountry = countries.filter(
      (c) => c.name.common === countryName
    );
    setFilteredCountries(choosenCountry);
  };

  const handleChange = (event) => {
    setCountry(event.target.value);
  };

  return (
    <div>
      <div>
        find countries <input value={country} onChange={handleChange} />
      </div>
      <Countries
        filteredCountries={filteredCountries}
        showCountry={showCountry}
        weatherData={weather}
      />
    </div>
  );
};

export default App;
