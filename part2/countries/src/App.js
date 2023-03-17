import { useState, useEffect } from "react";
import axios from "axios";

const ListCountries = ({ countries }) => (
  <div>
    {countries.map((country) => (
      <div key={country.cca2}>{country.name.common}</div>
    ))}
  </div>
);

const CountryDetails = ({ country }) => (
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
    <img src={country.flags.png} alt={`flag of ${country.name.common}`}></img>
  </div>
);

const Countries = ({ filteredCountries }) => {
  if (!filteredCountries) {
    return null;
  } else if (filteredCountries.length === 1) {
    return <CountryDetails country={filteredCountries[0]} />;
  } else if (filteredCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else {
    return <ListCountries countries={filteredCountries} />;
  }
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("");
  const [filteredCountries, setFilteredCountries] = useState(null);

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

  const handleChange = (event) => {
    setCountry(event.target.value);
  };

  return (
    <div>
      <div>
        find countries <input value={country} onChange={handleChange} />
      </div>
      <Countries filteredCountries={filteredCountries} />
    </div>
  );
};

export default App;
