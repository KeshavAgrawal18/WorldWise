export const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

export function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/fetched":
      return { ...state, cities: action.payload.cities, isLoading: false };
    case "city/fetched":
      return {
        ...state,
        currentCity: action.payload.currentCity,
        isLoading: false,
      };
    case "city/created":
      return {
        ...state,
        cities: [...state.cities, action.payload.city],
        isLoading: false,
        currentCity: action.payload.city,
      };
    case "city/deleted":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload.id),
        isLoading: false,
      };
    case "rejected":
      return { ...state, error: action.payload.error, isLoading: false };
    default:
      throw new Error("Unknown action type");
  }
}
