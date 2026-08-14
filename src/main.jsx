import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import "./main.css";

import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./pages/auth/AuthContext.jsx";

axios.defaults.baseURL = "https://presensi-magang-backend.vercel.app/api";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <App />
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);