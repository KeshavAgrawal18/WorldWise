/* eslint react/prop-types: 0 */
import CountryItem from "./CountryItem";
import Spinner from "./Spinner"
import styles from './CountryList.module.css'
import { useCity } from "../CityProvider";
import Message from "./Message";

function CountryList() {
    const { cities, isLoading } = useCity();
    if (isLoading)
        return <Spinner />;
    if (cities.length === 0)
        return <Message message="Oops there is no country. Click on the map to get started" />

    const countries = cities.reduce((arr, city) => {
        if (!arr.find(e => e.country == city.country)) return [...arr, { country: city.country, emoji: city.emoji }]
        else return arr
    }, [])
    console.log("country", countries)
    return (
        <div className={styles.countryList} >
            {countries.map((country, index) =>
                <CountryItem country={country} key={index} />
            )}
        </div>
    );
}



export default CountryList;