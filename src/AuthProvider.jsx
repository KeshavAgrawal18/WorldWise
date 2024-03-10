/* eslint react/prop-types: 0 */
import { createContext, useContext, useReducer } from "react";
import { AuthHeader, BASE_URL } from "./App";
import axios from "axios";

const AuthContext = createContext();
const initialState = {
    isAuthenticated: false,
    userId: "",
    username: "",
    avatar: "https://cdn-icons-png.freepik.com/64/10100/10100101.png",
}

function reducer(state, action) {
    switch (action.type) {
        case "authenticate":
            return {
                ...state,
                userId: action.payload.userId,
                username: action.payload.username,
                isAuthenticated: true
            };
        case "logout":
            return initialState;

        default:
            throw new Error("Unknown action type");

    }
}

function AuthProvider({ children }) {
    const [{ userId, isAuthenticated, username, avatar }, dispatch] = useReducer(reducer, initialState);

    function signup(email, username, password) {
        try {
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
                    if (Number(err.status) === 403)
                        return "UserExistsError: A user with the given username is already registered";
                    else
                        return "Something wrong happened. Try again";
                })
        } catch (error) {
            console.log(error);
        }
    }


    function login(username, password) {
        axios.post(`${BASE_URL}/login`, {
            username, password
        }, AuthHeader).then(response => {
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
                if (Number(err.status) === 403)
                    return "UserExistsError: A user with the given username is already registered";
                else
                    return "Something wrong happened. Try again";
            })

    }

    function logout() {
        dispatch({ type: "logout" });
    }


    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                userId,
                username,
                avatar,
                login,
                signup,
                logout,
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