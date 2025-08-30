import { useEffect, useState } from "react";
import './Counteries.css'

const Countries = () => {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getCountries();
    }, []);

    const getCountries = async () => {
        try {
            const response = await fetch("https://xcountries-backend.azurewebsites.net/all");
            if (!response.ok) {
                throw new Error("Failed to fetch countries");
            }
            const data = await response.json();
            setCountries(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <p className="status">Loading countries...</p>;
    }

    if (error) {
        return <p className="status error">Error: {error}</p>;
    }

    return (
        <div className="container">
            {countries.map((country) => (
                <div className="card" key={country.abbr}>
                    <img className="img" src={country.flag} alt={`${country.name} flag`} />
                    <p className="text">{country.name}</p>
                </div>
            ))}
        </div>
    );
};

export default Countries;
