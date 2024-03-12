import { useEffect } from "react";
import { useCity } from "../CityProvider";
import Map from "../components/Map";
import Sidebar from "../components/Sidebar";
import User from "../components/User";
import styles from './AppLayout.module.css'

function AppLayout() {
    const { fetchCities } = useCity();
    useEffect(() => {
        fetchCities();
    }, []);
    return (
        <div className={styles.app}>
            <Sidebar />
            <Map />
            <User />
        </div>
    );
}

export default AppLayout;