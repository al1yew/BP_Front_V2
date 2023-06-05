// import { useEffect, useRef, useState } from "react";
// import { BsChevronDown } from "react-icons/bs";

// const Dropdown = () => {
//     const [dropdown, setDropdown] = useState({
//         isOpen: false,
//         placeholder: props?.isItUpdatePage
//             ? props?.query?.find((x) => x.id == props?.selectedId)?.name
//             : props?.name,
//     });

//     const refDropdown = useRef();

//     function handleDropdown() {
//         setDropdown((prevValue) => {
//             return {
//                 ...prevValue,
//                 isOpen: !prevValue.isOpen,
//             };
//         });
//     }

//     function handleChange(forPlaceholder, id, entity) {
//         handlePlaceholder(forPlaceholder);
//         props.setValues(id, entity);
//     }

//     function handlePlaceholder(forPlaceholder) {
//         setDropdown((prevValue) => {
//             return {
//                 ...prevValue,
//                 placeholder: forPlaceholder,
//                 isOpen: !prevValue.isOpen,
//             };
//         });
//     }

//     useEffect(() => {
//         document.addEventListener("mousedown", handleOutsideClicks);

//         return () => {
//             document.removeEventListener("mousedown", handleOutsideClicks);
//         };
//     }, [refDropdown]);

//     const handleOutsideClicks = (e) => {
//         if (
//             !dropdown.isOpen &&
//             refDropdown.current &&
//             !refDropdown.current.contains(e.target)
//         ) {
//             setDropdown((prevValue) => {
//                 return {
//                     ...prevValue,
//                     isOpen: false,
//                 };
//             });
//         }
//     };

//     return (
//         <div ref={refDropdown} className="dropdownkeeper col-lg-12 col-12">
//             {dropdown.placeholder && (
//                 <>
//                     <div
//                         className="col-lg-12 col-12 dropdown_main"
//                         onClick={handleDropdown}
//                     >
//                         <span className="col-lg-10 col-10">
//                             {dropdown.placeholder}
//                         </span>
//                         <span
//                             className={`col-lg-2 col-2 ${
//                                 dropdown.isOpen ? "spanisopen" : ""
//                             }`}
//                         >
//                             <BsChevronDown />
//                         </span>
//                     </div>
//                     <div
//                         className={`col-lg-12 col-12 dropdown_menu ${
//                             dropdown.isOpen && "show_dropdown"
//                         }`}
//                     >
//                         <ul>
//                             <li
//                                 id="0"
//                                 onClick={() =>
//                                     handleChange(props.name, 0, props.name)
//                                 }
//                             >
//                                 {props.name}
//                             </li>
//                             {props.query.map((element, index) => {
//                                 return (
//                                     <li
//                                         key={index}
//                                         id={element.id}
//                                         onClick={() =>
//                                             handleChange(
//                                                 element.name,
//                                                 element.id,
//                                                 props.name
//                                             )
//                                         }
//                                     >
//                                         {element.name}
//                                     </li>
//                                 );
//                             })}
//                         </ul>
//                     </div>
//                 </>
//             )}
//         </div>
//     );
// };
// export default Dropdown;
