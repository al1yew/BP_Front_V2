import { useState, useEffect, createContext, useContext } from "react";

const ThemeContext = createContext();

const getInitialDarkMode = () => {
    const prefersDarkMode = window.matchMedia(
        "(prefers-color-scheme:dark)"
    ).matches;

    const storedDarkMode = localStorage.getItem("dark_theme") === "true";

    return storedDarkMode || prefersDarkMode;
};

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(getInitialDarkMode());

    const toggleDarkMode = () => {
        const newTheme = !isDarkMode;
        setIsDarkMode(newTheme);
        console.log("salam");
        localStorage.setItem(JSON.stringify("dark_theme", newTheme));
    };

    useEffect(() => {
        document.body.classList.toggle("dark_theme", isDarkMode);
    }, [isDarkMode]);

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useThemeContext = () => useContext(ThemeContext);
