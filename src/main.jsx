import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { ThemeProvider } from "./themeContext.jsx";
import { UserProvider } from "./userContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <ThemeProvider>
        <UserProvider>
            <App />
        </UserProvider>
    </ThemeProvider>
);
