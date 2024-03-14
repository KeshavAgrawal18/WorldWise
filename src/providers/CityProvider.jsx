/* eslint react/prop-types: 0 */
import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import Message from "../components/Message";
import { useAuth } from "./AuthProvider";
import { AuthHeader, BASE_URL } from "../utils/dataHelpers";
import { reducer, initialState } from "./cityReducer";

const CityContext = createContext();


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

  const { userId } = useAuth();



  async function fetchCities() {
    try {
      dispatch({ type: "loading" })
      const response = await fetch(`${BASE_URL}/cities/userId/${userId}`)
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

  useEffect(() => {
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      dispatch({ type: "loading" });
      const response = await fetch(`${BASE_URL}/cities/userId/${userId}/id/${id}`);
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
          newCity,
          userId
        }, AuthHeader
      )
      if (Number(response.status) === 200) {
        newCity = { ...newCity, id: response.data.id };
        dispatch({
          type: "city/created", payload: {
            city: newCity
          }
        })
      }

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
      const response = await axios.delete(`${BASE_URL}/city/delete`,
        {
          headers: AuthHeader.headers, data: {
            id: id,
            cityName: cityName,
            userId: userId,
          }
        })
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
        fetchCities,
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
