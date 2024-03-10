/* eslint react/prop-types: 0 */

function CountryEmoji({ emoji, size }) {
    return (
        <img src={`https://flagsapi.com/${emoji}/flat/${size}.png`} />
    );
}

export default CountryEmoji;