export const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

export const BASE_URL = "https://worldwise-server-i8cc.onrender.com/api";
// export const BASE_URL = "http://localhost:8000/api";
export const AuthHeader = {
  headers: {
    Authorization: "authenticationcode_secret",
  },
};
