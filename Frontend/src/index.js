import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {CookiesProvider} from 'react-cookie'
import ContextProvider from "./context/contextProvider";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <ContextProvider>
        <App />
    </ContextProvider>


);
