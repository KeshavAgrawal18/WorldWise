/* eslint react/prop-types: 0 */
import { useNavigate } from "react-router-dom";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";

function LocationButton() {
    const { isLoading, getPosition, position } = useGeolocation();
    // const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    return (
        <>
            {/* {!position && ( */}
            <Button onClick={() => {
                getPosition();
                console.log(position)
                navigate(`form?lat=${position.lat}&lng=${position.lng}`);
                // setSearchParams(position);
            }} type="position">
                {isLoading ? "Loading..." : "Use my Position"}
            </Button>
            {/* )} */}
        </>
    );
}

export default LocationButton;