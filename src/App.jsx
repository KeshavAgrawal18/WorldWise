import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import NotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import CityList from "./components/CityList";
import City from "./components/City";
import CountryList from "./components/CountryList";
import Form from "./components/Form";
import { CityProvider } from "./CityProvider";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { AuthProvider } from "./AuthProvider";
import ProtectedRoute from "./pages/ProtectedRoute";

export const BASE_URL = "http://localhost:8000/api";
export const AuthHeader = {
  headers: {
    Authorization: "authenticationcode_secret"
  },
};

function App() {

  return (
    <AuthProvider>
      <CityProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/Products" element={<Product />} />
            <Route path="/Pricing" element={<Pricing />} />
            <Route path="/app" element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            } >
              <Route index element={<Navigate replace to="cities" />} />
              <Route path="cities" element={<CityList />} />
              <Route path="cities/:id" element={<City />} />
              <Route path="countries" element={<CountryList />} />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

        </BrowserRouter>
      </CityProvider>
    </AuthProvider>
  );
}

export default App;