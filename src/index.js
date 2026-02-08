import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import axios from "axios";
axios.defaults.baseURL = "https://backend-tk-pugd.onrender.com/api";
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
