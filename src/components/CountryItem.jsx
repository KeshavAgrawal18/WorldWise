/* eslint react/prop-types: 0 */
import CountryEmoji from "./CountryEmoji";
import styles from "./CountryItem.module.css";

function CountryItem({ country }) {
  return (
    <li className={styles.countryItem}>
      <span>
        <CountryEmoji emoji={country.emoji} size={64} />
      </span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
