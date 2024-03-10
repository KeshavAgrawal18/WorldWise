/* eslint react/prop-types: 0 */
import { createContext, useContext, useEffect, useReducer } from "react";
import { AuthHeader, BASE_URL } from "./App";
import axios from "axios";
import Message from "./components/Message";

const CityContext = createContext();
const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
}

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/fetched":
      return { ...state, cities: action.payload.cities, isLoading: false };
    case "city/fetched":
      return { ...state, currentCity: action.payload.currentCity, isLoading: false };
    case "city/deleted":
      return { ...state, cities: state.cities.filter(city => city.id !== action.payload.id), isLoading: false };
    case "rejected":
      return { ...state, error: action.payload.error, isLoading: false };
    default:
      throw new Error("Unknown action type");
  }
}

function CityProvider({ children }) {
  const [
    {
      cities,
      isLoading,
      currentCity,
      error,
    },
    dispatch,
  ] = useReducer(reducer, initialState)

  useEffect(function () {
    async function fetchCities() {
      try {
        dispatch({ type: "loading" })
        const response = await fetch(`${BASE_URL}/cities`)
        const cities = await response.json()
        dispatch({
          type: "cities/fetched", payload: {
            cities: cities,
          }
        })
      }
      catch {
        dispatch({
          type: "rejected", payload: {
            error: "Unable to fetch cities from the Server",
          }
        })
        throw new Error("Unable to fetch cities from the Server");
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      dispatch({ type: "loading" });
      const response = await fetch(`${BASE_URL}/cities/${id}`);
      const responseData = await response.json();
      dispatch({
        type: "city/fetched",
        payload: {
          currentCity: responseData
        }
      });
    } catch (error) {
      dispatch({
        type: "rejected", payload: {
          error: error.message
        }
      })
    }
  }

  async function createCity(newCity) {

    dispatch({ type: "loading" });
    try {
      const response = await axios.post(`${BASE_URL}/newCity`,
        {
          newCity: newCity,
        }, AuthHeader)
      if (Number(response.status) === 200)
        window.location.href = "cities"
      else
        <Message message={response.Error} />
    } catch (error) {
      <Message message={error.message} />
      dispatch({
        type: "rejected", payload: {
          error: error.message
        }
      })
    }


  }
  async function deleteCity(id, cityName) {
    dispatch({ type: "loading" });
    try {
      const response = await axios.delete(`${BASE_URL}/city/delete`, {
        id: id,
        cityName: cityName,
      },
        AuthHeader)
      if (Number(response.status) === 200)
        dispatch({
          type: "city/deleted",
          payload: {
            id: id,
          }
        });
      else
        <Message message={response.Error} />
    } catch (error) {
      <Message message={error} />
      dispatch({
        type: "rejected", payload: {
          error: error.message
        }
      })
    }


  }

  return (
    <CityContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
        error,
      }}
    >
      {children}
    </CityContext.Provider>
  );
}

function useCity() {
  const context = useContext(CityContext);
  if (context === undefined)
    throw new Error("CityContext was used out of CityProvider");
  return context;
}

export { CityProvider, useCity };
