import { Link, useNavigate } from "react-router-dom";
import Preloader from "./Preloader";

const Table = ({ entity, data, handleDelete }) => {
    const navigate = useNavigate();

    return (
        <div className="row all">
            <div className="top col-lg-12 col-md-12 col-12">
                <div className="col-lg-2 col-md-4 col-6 left">{entity}</div>

                <div className="col-lg-1 col-md-2 col-3 text-end right">
                    <Link
                        to={`/manage/${entity}/create`}
                        className="btn btn-primary"
                    >
                        Create
                    </Link>
                </div>
            </div>

            {data ? (
                <div className="tablecontainer col-lg-12 col-md-12 col-12">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th scope="col" className="text-center">
                                    No
                                </th>
                                <th scope="col" className="text-center">
                                    Name
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
                            {data.map((d, i) => {
                                return (
                                    <tr key={d?.id}>
                                        <th scope="row" className="text-center">
                                            {i + 1}
                                        </th>
                                        <td className="text-center">
                                            {d?.name}
                                        </td>
                                        <td className="text-center">
                                            <button
                                                type="button"
                                                className="btn btn-warning"
                                                onClick={() =>
                                                    navigate(
                                                        `/manage/${entity}/update/${d?.id}`
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
                                                    handleDelete(d?.id)
                                                }
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            ) : (
                <Preloader />
            )}
        </div>
    );
};
export default Table;
