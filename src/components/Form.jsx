// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import CountryEmoji from "./CountryEmoji";
import { useCity } from "../providers/CityProvider";
import { useAuth } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";



function Form() {
  const { createCity, isLoading } = useCity();
  const { isAuthenticated } = useAuth();
  const [lat, lng] = useUrlPosition();
  const [cityName, setCityName] = useState("");
  const [countryName, setCountryName] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [geoCodingError, setgeoCodingError] = useState('');
  const [isLoadingGeolocationCode, setIsLoadingGeolocationCode] = useState(false);
  const [emoji, setEmoji] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    async function fetchGeolocationCode() {
      setgeoCodingError('')
      try {
        if (!lat || !lng) return;
        setIsLoadingGeolocationCode(true);
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();

        if (!data.countryName) {
          throw new Error("That doesn't seems to be a city. Click somehere else.")
        }
        setCityName(data.city || data.locality || '');
        setCountryName(data.countryName || '');
        setEmoji(data.countryCode);

      }
      catch (err) {
        setgeoCodingError(err.message);
        console.log(err);
      } finally {
        setIsLoadingGeolocationCode(false);
      }
    }
    fetchGeolocationCode();
  }, [lat, lng]);

  function handleSubmit(e) {

    e.preventDefault();

    if (!isAuthenticated)
      navigate("/login");

    if (!countryName || !cityName || !date) return;
    const newCity = {
      cityName,
      country: countryName,
      emoji,
      date,
      notes,
      position: {
        lat,
        lng
      },
    }
    createCity(newCity);
    navigate("/app/cities");

  }

  if (!lat || !lng) return <Message message='Start with clicking somewhere on the map.' />

  if (isLoadingGeolocationCode)
    return <Spinner />

  if (geoCodingError)
    return <Message message={geoCodingError} />

  return (
    <form className={`${styles.form} ${isLoading ? styles.loading : ''}`} onSubmit={e => handleSubmit(e)}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}><CountryEmoji emoji={emoji} size={24} /></span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker selected={date} onChange={(date) => setDate(date)} dateFormat="dd/MM/yyyy" id="date" />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">
          Add
        </Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
