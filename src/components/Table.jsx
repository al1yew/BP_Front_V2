// import { Link, useNavigate } from "react-router-dom";

// const Table = () => {
//     const navigate = useNavigate();

//     return (
//         <div className="row all">
//             <div className="top col-lg-12 col-12">
//                 <div className="col-lg-2 col-6 left">{props?.entity}</div>

//                 <div className="col-lg-1 col-3 text-end right">
//                     <Link
//                         to={`/manage/${props?.entity}/create`}
//                         className="btn btn-primary"
//                     >
//                         Create
//                     </Link>
//                 </div>
//             </div>

//             {props?.data?.length ? (
//                 <div className="tablecontainer col-lg-12 col-12">
//                     <table className="table table-striped table-bordered">
//                         <thead>
//                             <tr>
//                                 <th scope="col" className="text-center">
//                                     No
//                                 </th>
//                                 <th scope="col" className="text-center">
//                                     Name
//                                 </th>
//                                 <th scope="col" className="text-center">
//                                     Update
//                                 </th>
//                                 <th scope="col" className="text-center">
//                                     Delete
//                                 </th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {props?.data &&
//                                 props?.data?.map((data, index) => {
//                                     return (
//                                         <tr key={data?.id}>
//                                             <th
//                                                 scope="row"
//                                                 className="text-center"
//                                             >
//                                                 {index + 1}
//                                             </th>
//                                             <td className="text-center">
//                                                 {data?.name}
//                                             </td>
//                                             <td className="text-center">
//                                                 <button
//                                                     type="button"
//                                                     className="btn btn-warning"
//                                                     onClick={() =>
//                                                         navigate(
//                                                             `/manage/${props.entity}/update/${data?.id}`
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
//                                                         props.deleteFunc(
//                                                             data?.id
//                                                         )
//                                                     }
//                                                 >
//                                                     Delete
//                                                 </button>
//                                             </td>
//                                         </tr>
//                                     );
//                                 })}
//                         </tbody>
//                     </table>
//                 </div>
//             ) : (
//                 <div className="loader"></div>
//             )}
//         </div>
//     );
// };
// export default Table;
