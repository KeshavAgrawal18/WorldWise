/* eslint react/prop-types: 0 */
import { createContext, useContext, useReducer } from "react";
import axios from "axios";
import { AuthHeader, BASE_URL } from "../utils/dataHelpers";
import { reducer, initialState } from "./authReducers";

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [{ userId, isAuthenticated, username, avatar, error }, dispatch] = useReducer(reducer, initialState);

    function signup(email, username, password) {
        axios.post(`${BASE_URL}/signup`, {
            email: email,
            password: password,
            username: username
        }, AuthHeader

        ).then(response => {
            dispatch({
                type: "authenticate",
                payload:
                {
                    userId: response.data.userId,
                    username: response.data.username,
                }
            })
        }
        )
            .catch(err => {
                if (Number(err.response.status) === 409) {
                    dispatch({ type: "rejected", payload: { error: err.response.data.message } });
                }
                else {
                    dispatch({ type: "rejected", payload: { error: "Something wrong happened. Try again" } });
                }
            })
    }


    function login(username, password) {
        axios.post(`${BASE_URL}/login`, {
            username, password
        }, AuthHeader)
            .then(response => {
                dispatch({
                    type: "authenticate",
                    payload:
                    {
                        userId: response.data.userId,
                        username: response.data.username,
                    }
                })
            }
            )
            .catch(err => {
                if (Number(err.response.status === 404))
                    dispatch({ type: "rejected", payload: { error: "User does not exist. Please SignUp." } });
                else
                    dispatch({ type: "rejected", payload: { error: "Something wrong happened. Try again" } });
            })

    }

    function logout() {
        dispatch({ type: "logout" });
    }

    function clearError() {
        dispatch({ type: "removeError" });
    }

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                userId,
                username,
                avatar,
                error,
                login,
                signup,
                logout,
                clearError,
            }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined)
        throw new Error("AuthContext was used out of AuthProvider")
    return context;
}

export { AuthProvider, useAuth };