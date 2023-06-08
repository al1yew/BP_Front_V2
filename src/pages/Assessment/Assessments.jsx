import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserContext } from "../../userContext";
import {
    FILTER,
    SET_DATA,
    SET_FILTER,
    apilink,
    SET_ASSESSMENTS_AFTER_DELETE,
} from "../../constants";
import Preloader from "../../components/Preloader";
import reducer from "../../reducer";

const defaultState = {
    assessments: null,
    filteredAssessments: null,
    filterOptions: {
        weightId: 0,
        distanceId: 0,
        frequencyId: 0,
        needToAssess: 0,
        page: 1,
        showCount: 10,
    },
    pagesCount: 0,
    options: {
        distances: null,
        frequencies: null,
        weights: null,
    },
};

const Assessments = () => {
    const [state, dispatch] = useReducer(reducer, defaultState);
    const { user } = useUserContext();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await axios.get(apilink + "/assessments/", {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });

                dispatch({ type: SET_DATA, payload: data });
            } catch (error) {
                const errorObj = error?.response?.data?.errors;
                const errorMsg = error?.response?.data;

                if (errorObj) {
                    Object.values(errorObj).forEach((obj) => {
                        toast.error(obj.toString());
                    });
                } else {
                    toast.error(error.message);
                    toast.error(errorMsg);
                }
                navigate(-1);
            } finally {
                setIsLoading(false);
            }
        };

        getData();
    }, []);

    const handleDelete = async (id) => {
        setIsLoading(true);
        try {
            const { data } = await axios.delete(
                apilink + `/assessments/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );

            dispatch({ type: SET_ASSESSMENTS_AFTER_DELETE, payload: data });
            toast.success("Deleted!");
        } catch (error) {
            const errorObj = error?.response?.data?.errors;
            const errorMsg = error?.response?.data;

            if (errorObj) {
                Object.values(errorObj).forEach((obj) => {
                    toast.error(obj.toString());
                });
            } else {
                toast.error(error.message);
                toast.error(errorMsg);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleSort = (e) => {
        dispatch({
            type: SET_FILTER,
            payload: { name: e.target.name, value: e.target.value },
        });
        dispatch({ type: FILTER });
    };

    //vnizu jopa

    return isLoading ? (
        <Preloader />
    ) : (
        <section className="tablekeeper">
            <div className="container">
                <div className="row all">
                    <div className="top col-lg-12 col-md-12 col-12">
                        <div className="col-lg-2 col-md-4 col-6 left">
                            Assessments
                        </div>

                        <div className="col-lg-7 col-md-12 col-12 middle">
                            <select
                                value={state.filterOptions.weightId}
                                id="weightId"
                                name="weightId"
                                className="col-lg-2-2 col-md-5-8 col-5-8"
                                onChange={handleSort}
                            >
                                <option value="0">Weights</option>
                                {state.options.weights.map((entity, index) => {
                                    return (
                                        <option key={index} value={entity.id}>
                                            {entity.name}
                                        </option>
                                    );
                                })}
                            </select>

                            <select
                                value={state.filterOptions.distanceId}
                                id="distanceId"
                                name="distanceId"
                                className="col-lg-2-2 col-md-5-8 col-5-8"
                                onChange={handleSort}
                            >
                                <option value="0">Distances</option>
                                {state.options.distances.map(
                                    (entity, index) => {
                                        return (
                                            <option
                                                key={index}
                                                value={entity.id}
                                            >
                                                {entity.name}
                                            </option>
                                        );
                                    }
                                )}
                            </select>

                            <select
                                value={state.filterOptions.frequencyId}
                                id="frequencyId"
                                name="frequencyId"
                                className="col-lg-2-2 col-md-5-8 col-5-8"
                                onChange={handleSort}
                            >
                                <option value="0">Frequencies</option>
                                {state.options.frequencies.map(
                                    (entity, index) => {
                                        return (
                                            <option
                                                key={index}
                                                value={entity.id}
                                            >
                                                {entity.name}
                                            </option>
                                        );
                                    }
                                )}
                            </select>

                            <select
                                value={state.filterOptions.needToAssess}
                                id="needToAssess"
                                name="needToAssess"
                                className="col-lg-2-2 col-md-3 col-3"
                                onChange={handleSort}
                            >
                                <option value="0">All</option>
                                <option value="1">Assess</option>
                                <option value="2">No Assess</option>
                            </select>

                            <select
                                value={state.filterOptions.showCount}
                                id="showCount"
                                name="showCount"
                                className="col-lg-2-2 col-md-2-5 col-2-5"
                                onChange={handleSort}
                            >
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="30">30</option>
                                <option value="40">40</option>
                                <option value="50">50</option>
                            </select>
                        </div>

                        <div className="col-lg-1 col-md-3 col-3 text-end right">
                            <Link
                                to="/manage/assessments/create"
                                className="btn btn-primary"
                            >
                                Create
                            </Link>
                        </div>
                    </div>

                    <div className="tablecontainer col-lg-12 col-md-12 col-12">
                        <table className="table table-striped table-bordered ">
                            <thead>
                                <tr>
                                    <th scope="col" className="text-center">
                                        No
                                    </th>
                                    <th scope="col" className="text-center">
                                        Weight kg.
                                    </th>
                                    <th scope="col" className="text-center">
                                        Distance mt.
                                    </th>
                                    <th scope="col" className="text-center">
                                        Frequency t/hour
                                    </th>
                                    <th scope="col" className="text-center">
                                        Assess?
                                    </th>
                                    <th scope="col" className="text-center">
                                        Update
                                    </th>
                                    <th scope="col" className="text-center">
                                        Delete
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {state.filteredAssessments.map(
                                    (assessment, index) => {
                                        return (
                                            <tr key={assessment.id}>
                                                <th
                                                    scope="row"
                                                    className="text-center"
                                                >
                                                    {state.filterOptions.page *
                                                        state.filterOptions
                                                            .showCount -
                                                        state.filterOptions
                                                            .showCount +
                                                        index +
                                                        1}
                                                </th>
                                                <td className="text-center">
                                                    {assessment.weight.name}
                                                </td>
                                                <td className="text-center">
                                                    {assessment.distance.name}
                                                </td>
                                                <td className="text-center">
                                                    {assessment.frequency.name}
                                                </td>
                                                <td
                                                    className={
                                                        assessment.needToAssess
                                                            ? "text-success text-center"
                                                            : "text-danger text-center"
                                                    }
                                                >
                                                    {assessment.needToAssess
                                                        ? "Yes"
                                                        : "No"}
                                                </td>
                                                <td className="text-center">
                                                    <button
                                                        type="button"
                                                        className="btn btn-warning"
                                                        onClick={() =>
                                                            navigate(
                                                                `/manage/assessments/update/${assessment.id}`
                                                            )
                                                        }
                                                    >
                                                        Update
                                                    </button>
                                                </td>
                                                <td className="text-center">
                                                    <button
                                                        type="button"
                                                        className="btn btn-danger"
                                                        onClick={() =>
                                                            handleDelete(
                                                                assessment.id
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    }
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="pagination col-lg-12 col-md-12 col-12">
                        <ul className="pagination pagination-md">
                            {[...Array(state.pagesCount)].map((_, index) => {
                                return (
                                    <li
                                        key={index}
                                        className={`page-item ${
                                            state.filterOptions.page ===
                                            index + 1
                                                ? "active"
                                                : ""
                                        }`}
                                    >
                                        <button
                                            className="page-link"
                                            onClick={handleSort}
                                            value={index + 1}
                                            name="page"
                                        >
                                            {index + 1}
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Assessments;

// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { useUserContext } from "../userContext";
// import { apilink } from "../constants";
// import Preloader from "../components/Preloader";

// const Assessments = () => {
//     const [assessments, setAssessments] = useState({
//         query: null,
//         totalCount: 0,
//     });

//     const [filterOptions, setFilterOptions] = useState({
//         weightId: 0,
//         distanceId: 0,
//         frequencyId: 0,
//         needToAssess: 0,
//         showCount: 10,
//         page: 1,
//     });

//     const [isLoading, setIsLoading] = useState(true);

//     const [options, setOptions] = useState({
//         distances: [],
//         frequencies: [],
//         weights: [],
//     });

//     const { user } = useUserContext();

//     const navigate = useNavigate();

//     useEffect(() => {
//         const getData = async () => {
//             try {
//                 const { data } = await axios.get(apilink + "/assessments/", {
//                     headers: {
//                         Authorization: `Bearer ${user.token}`,
//                     },
//                     params: filterOptions,
//                 });

//                 setAssessments(data);
//             } catch (error) {
//                 const errorMsg = error?.response?.data;
//                 toast.error(errorMsg);
//                 navigate(-1);
//             }

//             try {
//                 const { data } = await axios.get(
//                     apilink + "/assessments/getalldata",
//                     {
//                         headers: {
//                             Authorization: `Bearer ${user.token}`,
//                         },
//                     }
//                 );

//                 setOptions(data);
//             } catch (error) {
//                 const errorMsg = error?.response?.data;
//                 toast.error(errorMsg);
//                 navigate(-1);
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         getData();
//     }, []);

//     const handleDelete = async (id) => {
//         setIsLoading(true);

//         try {
//             const { data } = await axios.delete(
//                 apilink + `/assessments/${id}`,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${user.token}`,
//                     },
//                     params: filterOptions,
//                 }
//             );

//             setAssessments(data);
//             toast.success("Deleted!");
//         } catch (error) {
//             const errorObj = error?.response?.data?.errors;
//             const errorMsg = error?.response?.data;

//             if (errorObj) {
//                 Object.values(errorObj).forEach((obj) => {
//                     toast.error(obj.toString());
//                 });
//             } else {
//                 toast.error(errorMsg);
//             }
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleSort = async (e) => {
//         setIsLoading(true);
//         setAssessments({ query: [], totalCount: 0 });

//         try {
//             const { data } = await axios.get(apilink + `/assessments/`, {
//                 headers: {
//                     Authorization: `Bearer ${user.token}`,
//                 },
//                 params: {
//                     weightId:
//                         e.target.name == "weightId"
//                             ? e.target.value
//                             : filterOptions.weightId,
//                     distanceId:
//                         e.target.name == "distanceId"
//                             ? e.target.value
//                             : filterOptions.distanceId,
//                     frequencyId:
//                         e.target.name == "frequencyId"
//                             ? e.target.value
//                             : filterOptions.frequencyId,
//                     needToAssess:
//                         e.target.name == "needToAssess"
//                             ? e.target.value
//                             : filterOptions.needToAssess,
//                     showCount:
//                         e.target.name == "showCount"
//                             ? e.target.value
//                             : filterOptions.showCount,
//                     page: e.target.name == "page" ? e.target.value : 1,
//                 },
//             });

//             setAssessments(data);
//         } catch (error) {
//             const errorObj = error?.response?.data?.errors;
//             const errorMsg = error?.response?.data;

//             if (errorObj) {
//                 Object.values(errorObj).forEach((obj) => {
//                     toast.error(obj.toString());
//                 });
//             } else {
//                 toast.error(errorMsg);
//             }
//         } finally {
//             setIsLoading(false);
//         }

//         setFilterOptions((prevValue) => {
//             const { name, value } = e.target;

//             return {
//                 ...prevValue,
//                 [name]: parseInt(value),
//                 page: [name] == "page" ? e.target.value : 1,
//             };
//         });
//     };

//     return isLoading ? (
//         <Preloader />
//     ) : (
//         <section className="tablekeeper">
//             <div className="container">
//                 <div className="row all">
//                     <div className="top col-lg-12 col-md-12 col-12">
//                         <div className="col-lg-2 col-md-4 col-6 left">
//                             Assessments
//                         </div>

//                         <div className="col-lg-7 col-md-12 col-12 middle">
//                             <select
//                                 value={filterOptions?.weightId}
//                                 id="weightId"
//                                 name="weightId"
//                                 className="col-lg-2-2 col-md-5-8 col-5-8"
//                                 onChange={handleSort}
//                             >
//                                 <option value="0">Weights</option>
//                                 {options?.weights?.length &&
//                                     options?.weights?.map((entity, index) => {
//                                         return (
//                                             <option
//                                                 key={index}
//                                                 value={entity.id}
//                                             >
//                                                 {entity.name}
//                                             </option>
//                                         );
//                                     })}
//                             </select>

//                             <select
//                                 value={filterOptions?.distanceId}
//                                 id="distanceId"
//                                 name="distanceId"
//                                 className="col-lg-2-2 col-md-5-8 col-5-8"
//                                 onChange={handleSort}
//                             >
//                                 <option value="0">Distances</option>
//                                 {options?.distances?.length &&
//                                     options?.distances?.map((entity, index) => {
//                                         return (
//                                             <option
//                                                 key={index}
//                                                 value={entity.id}
//                                             >
//                                                 {entity.name}
//                                             </option>
//                                         );
//                                     })}
//                             </select>

//                             <select
//                                 value={filterOptions?.frequencyId}
//                                 id="frequencyId"
//                                 name="frequencyId"
//                                 className="col-lg-2-2 col-md-5-8 col-5-8"
//                                 onChange={handleSort}
//                             >
//                                 <option value="0">Frequencies</option>
//                                 {options?.frequencies?.length &&
//                                     options?.frequencies?.map(
//                                         (entity, index) => {
//                                             return (
//                                                 <option
//                                                     key={index}
//                                                     value={entity.id}
//                                                 >
//                                                     {entity.name}
//                                                 </option>
//                                             );
//                                         }
//                                     )}
//                             </select>

//                             <select
//                                 value={filterOptions?.needToAssess}
//                                 id="needToAssess"
//                                 name="needToAssess"
//                                 className="col-lg-2-2 col-md-3 col-3"
//                                 onChange={handleSort}
//                             >
//                                 <option value="0">All</option>
//                                 <option value="1">Assess</option>
//                                 <option value="2">No Assess</option>
//                             </select>

//                             <select
//                                 value={filterOptions.showCount}
//                                 id="showCount"
//                                 name="showCount"
//                                 className="col-lg-2-2 col-md-2-5 col-2-5"
//                                 onChange={handleSort}
//                             >
//                                 {/* <option value="5">5</option> ne zabud smenit v backende toje esli zaxocesh pokazivat po 5 */}
//                                 <option value="10">10</option>
//                                 <option value="20">20</option>
//                                 <option value="30">30</option>
//                                 <option value="40">40</option>
//                                 <option value="50">50</option>
//                             </select>
//                         </div>

//                         <div className="col-lg-1 col-md-3 col-3 text-end right">
//                             <Link
//                                 to="/manage/assessments/create"
//                                 className="btn btn-primary"
//                             >
//                                 Create
//                             </Link>
//                         </div>
//                     </div>

//                     <div className="tablecontainer col-lg-12 col-md-12 col-12">
//                         <table className="table table-striped table-bordered ">
//                             <thead>
//                                 <tr>
//                                     <th scope="col" className="text-center">
//                                         No
//                                     </th>
//                                     <th scope="col" className="text-center">
//                                         Weight kg.
//                                     </th>
//                                     <th scope="col" className="text-center">
//                                         Distance mt.
//                                     </th>
//                                     <th scope="col" className="text-center">
//                                         Frequency t/hour
//                                     </th>
//                                     <th scope="col" className="text-center">
//                                         Assess?
//                                     </th>
//                                     <th scope="col" className="text-center">
//                                         Update
//                                     </th>
//                                     <th scope="col" className="text-center">
//                                         Delete
//                                     </th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {assessments.query.map((assessment, index) => {
//                                     return (
//                                         <tr key={assessment.id}>
//                                             <th
//                                                 scope="row"
//                                                 className="text-center"
//                                             >
//                                                 {filterOptions.page *
//                                                     filterOptions.showCount -
//                                                     filterOptions.showCount +
//                                                     index +
//                                                     1}
//                                             </th>
//                                             <td className="text-center">
//                                                 {assessment.weight?.name}
//                                             </td>
//                                             <td className="text-center">
//                                                 {assessment.distance?.name}
//                                             </td>
//                                             <td className="text-center">
//                                                 {assessment.frequency?.name}
//                                             </td>
//                                             <td
//                                                 className={
//                                                     assessment.needToAssess
//                                                         ? "text-success text-center"
//                                                         : "text-danger text-center"
//                                                 }
//                                             >
//                                                 {assessment.needToAssess
//                                                     ? "Yes"
//                                                     : "No"}
//                                             </td>
//                                             <td className="text-center">
//                                                 <button
//                                                     type="button"
//                                                     className="btn btn-warning"
//                                                     onClick={() =>
//                                                         navigate(
//                                                             `/manage/assessments/update/${assessment.id}`
//                                                         )
//                                                     }
//                                                 >
//                                                     Update
//                                                 </button>
//                                             </td>
//                                             <td className="text-center">
//                                                 <button
//                                                     type="button"
//                                                     className="btn btn-danger"
//                                                     onClick={() =>
//                                                         handleDelete(
//                                                             assessment.id
//                                                         )
//                                                     }
//                                                 >
//                                                     Delete
//                                                 </button>
//                                             </td>
//                                         </tr>
//                                     );
//                                 })}
//                             </tbody>
//                         </table>
//                     </div>

//                     <div className="pagination col-lg-12 col-md-12 col-12">
//                         <ul className="pagination pagination-md">
//                             {assessments.query.length &&
//                                 [
//                                     ...Array(
//                                         Math.ceil(
//                                             assessments.totalCount /
//                                                 filterOptions.showCount
//                                         )
//                                     ),
//                                 ].map((_, index) => {
//                                     return (
//                                         <li key={index} className="page-item">
//                                             <label
//                                                 className="page-link"
//                                                 htmlFor={
//                                                     `pagination` + (index + 1)
//                                                 }
//                                             >
//                                                 {index + 1}
//                                             </label>
//                                             <input
//                                                 type="radio"
//                                                 id={`pagination` + (index + 1)}
//                                                 name="page"
//                                                 value={index + 1}
//                                                 onChange={handleSort}
//                                                 checked={
//                                                     filterOptions.page ==
//                                                     index + 1
//                                                 }
//                                             />
//                                         </li>
//                                     );
//                                 })}
//                         </ul>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default Assessments;
