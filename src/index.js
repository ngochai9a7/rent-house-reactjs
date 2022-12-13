import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FirebaseProvider } from "./firebase";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import './i18n'

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat",
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <FirebaseProvider>
        <App />   
    </FirebaseProvider>
  </BrowserRouter>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
