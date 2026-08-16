import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./main.css";

import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./pages/auth/AuthContext.jsx";

import hero from './assets/hero.png';

axios.defaults.baseURL = "https://presensi-magang-backend.vercel.app/api";

const link = document.createElement("link");
link.rel = "icon";
link.type = "image/png";
link.href = hero;
document.head.appendChild(link);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <App />
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);