/* eslint react/prop-types: 0 */
import CityItem from "./CityItem";
import Spinner from "./Spinner"
import styles from './CityList.module.css'
import { useCity } from "../CityProvider";
import Message from "./Message";

function CityList() {
    const { cities, isLoading } = useCity();
    if (isLoading)
        return <Spinner />;
    if (cities.length === 0)
        return <Message message="Oops there is no city. Click on the map to get started" />
    console.log(cities);
    return (
        <div className={styles.cityList}>
            {cities.map((city) =>
                <CityItem city={city} key={city.id} />
            )}
        </div>
    );
}



export default CityList;