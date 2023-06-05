import { useState, useEffect, useRef } from "react";
import { BsChevronDown, BsSun, BsMoon } from "react-icons/bs";
import logo from "../assets/images/sticker.jpg";
import { Link } from "react-router-dom";
import { useThemeContext } from "../themeContext";

const Header = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const { isDarkMode, toggleDarkMode } = useThemeContext();

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClicks);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClicks);
        };
    }, [dropdownRef]);

    const handleOutsideClicks = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setIsDropdownOpen(false);
        }
    };

    return (
        <header className="header">
            <div className="container">
                <div className="row all">
                    <div className="left">Welcome, user</div>

                    <div className="middle">
                        <img className="img-fluid" src={logo} alt="bp" />
                    </div>

                    <div className="right" ref={dropdownRef}>
                        <span className="theme">
                            {isDarkMode ? (
                                <BsSun onClick={toggleDarkMode} />
                            ) : (
                                <BsMoon onClick={toggleDarkMode} />
                            )}
                        </span>
                        <span
                            className={`chevronspan ${
                                isDropdownOpen && "rotatechevronspan"
                            }`}
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            <BsChevronDown />
                        </span>

                        <div
                            className={`dropdownmenu ${
                                isDropdownOpen && "opendropdownmenu"
                            }`}
                        >
                            <Link
                                to="/manage/account/login"
                                className=""
                                onClick={() => setIsDropdownOpen(false)}
                            >
                                Login
                            </Link>
                            <Link
                                to="/manage/account/login"
                                className=""
                                onClick={() => setIsDropdownOpen(false)}
                            >
                                Logout
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
export default Header;
