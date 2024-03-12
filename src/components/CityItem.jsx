/* eslint react/prop-types: 0 */
import { Link, useNavigate } from 'react-router-dom';
import styles from './CityItem.module.css'
import { useCity } from '../CityProvider';
import CountryEmoji from './CountryEmoji';
import { useAuth } from '../AuthProvider';

const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date(date));

function CityItem({ city }) {
    const { currentCity, deleteCity } = useCity();
    const { isAuthenticated } = useAuth();
    const { cityName, emoji, date, id, position } = city;
    const navigate = useNavigate();

    function handleClick() {

        if (!isAuthenticated)
            navigate("/login");

        deleteCity(id, cityName);
    }

    return (
        <li>
            <Link className={`${styles.cityItem} ${currentCity.id === id && styles.cityItemActive}`} to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
                <span className={styles.emoji}>
                    <CountryEmoji emoji={emoji} size={16} />
                </span>
                <h3 className={styles.name}>
                    {cityName}
                </h3>
                <time className={styles.date}>({formatDate(date)})</time>
                <button className={styles.deleteBtn} onClick={(e) => {
                    e.preventDefault()
                    handleClick();
                }}>&times;</button>
            </Link>
        </li >
    );
}

export default CityItem;