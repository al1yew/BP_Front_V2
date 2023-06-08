import { useEffect, useRef, useState } from "react";
import { BsChevronDown } from "react-icons/bs";

const Dropdown = ({ query, selectedValue, entityName, handleChange }) => {
    const [dropdown, setDropdown] = useState({
        isOpen: false,
        placeholder: selectedValue,
    });

    const dropdownRef = useRef();

    function handleDropdown() {
        setDropdown((prevValue) => {
            return {
                ...prevValue,
                isOpen: !prevValue.isOpen,
            };
        });
    }

    function handleSelect(placeholder, id, entity) {
        handlePlaceholder(placeholder);
        handleChange(id, entity);
    }

    function handlePlaceholder(placeholder) {
        setDropdown((prevValue) => {
            return {
                ...prevValue,
                placeholder,
                isOpen: false,
            };
        });
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClicks);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClicks);
        };
    }, [dropdownRef]);

    const handleOutsideClicks = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setDropdown((prevValue) => {
                return {
                    ...prevValue,
                    isOpen: false,
                };
            });
        }
    };

    return (
        query && (
            <div
                ref={dropdownRef}
                className="dropdownkeeper col-lg-12 col-md-12 col-12"
            >
                <div
                    className="col-lg-12 col-md-12 col-12 dropdown_main"
                    onClick={handleDropdown}
                >
                    <span className="col-lg-10 col-md-10 col-10">
                        {dropdown.placeholder}
                    </span>
                    <span
                        className={`col-lg-2 col-md-2 col-2 ${
                            dropdown.isOpen ? "spanisopen" : ""
                        }`}
                    >
                        <BsChevronDown />
                    </span>
                </div>
                <div
                    className={`col-lg-12 col-md-12 col-12 dropdown_menu ${
                        dropdown.isOpen && "show_dropdown"
                    }`}
                >
                    <ul>
                        <li
                            onClick={() =>
                                handleSelect(
                                    entityName,
                                    0,
                                    entityName
                                )
                            }
                        >
                            {entityName}
                        </li>
                        {query.map((el, i) => {
                            return (
                                <li
                                    key={i}
                                    onClick={() =>
                                        handleSelect(el.name, el.id, entityName)
                                    }
                                >
                                    {el.name}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        )
    );
};
export default Dropdown;
