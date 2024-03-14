/* eslint react/prop-types: 0 */
import { useEffect, useState } from 'react';
import { useCity } from '../providers/CityProvider';

import CountryEmoji from './CountryEmoji';
import styles from './Map.module.css'
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet'
import { useNavigate } from 'react-router-dom';
import LocationButton from './LocationButton';
import L from 'leaflet';
import { useUrlPosition } from '../hooks/useUrlPosition';


function Map() {

    const [mapPosition, setMapPosition] = useState([28.6139, 77.2090]);
    const { cities } = useCity();
    const [lat, lng] = useUrlPosition();

    useEffect(() => {

        if (lat && lng) setMapPosition([lat, lng]);
    }, [lat, lng])


    const redMarker = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
    });

    return (
        <div className={styles.mapContainer}>
            <LocationButton />
            <MapContainer center={mapPosition} zoom={6} scrollWheelZoom={true} className={styles.map}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {cities.map((city) =>
                    <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
                        <Popup>
                            <span><CountryEmoji emoji={city.emoji} size={16} /></span>
                            <span>{city.cityName}</span>
                        </Popup>
                    </Marker>)}
                {lat && lng && <Marker position={mapPosition} icon={redMarker} >
                    <Popup>
                        <span>My Position</span>
                    </Popup>
                </Marker>}
                <ChangeCenter position={mapPosition} />
                <DetectClick />
            </MapContainer>
        </div>
    );
}

function ChangeCenter({ position }) {
    const map = useMap();
    map.setView(position);
    return null;
}

function DetectClick() {
    const navigate = useNavigate();
    useMapEvents({
        click: e => {
            navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
        },
    })
    return null;
}

export default Map;