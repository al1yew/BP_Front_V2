import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserContext } from "../../userContext";
import { apilink } from "../../constants";
import Preloader from "../../components/Preloader";

const Users = () => {
    const [users, setUsers] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const { user } = useUserContext();

    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await axios.get(apilink + "/users/getall", {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                    params: {
                        username: user.userName,
                    },
                });

                setUsers(data);
            } catch (error) {
                const errorMsg = error?.response?.data;
                toast.error(errorMsg);
                navigate(-1, { delay: 200 });
            } finally {
                setIsLoading(false);
            }
        };

        getData();
    }, []);

    const handleDelete = async (id) => {
        setIsLoading(true);

        try {
            const { data } = await axios.delete(apilink + "/users/", {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
                params: {
                    id: id,
                    username: user.userName,
                },
            });

            setUsers(data);
            toast.success("Deleted!");
        } catch (error) {
            const errorObj = error?.response?.data?.errors;
            const errorMsg = error?.response?.data;

            if (errorObj) {
                Object.values(errorObj).forEach((obj) => {
                    toast.error(obj.toString());
                });
            } else {
                toast.error(errorMsg);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="tablekeeper">
            <div className="container">
                <div className="row all">
                    <div className="top col-lg-12 col-md-12 col-12">
                        <div className="col-lg-2 col-md-3 col-6 left">
                            Users
                        </div>
                        <div className="col-lg-1 col-md-2 col-3 text-end right">
                            <Link
                                to="/manage/users/create"
                                className="btn btn-primary"
                            >
                                Create
                            </Link>
                        </div>
                    </div>
                    {isLoading ? (
                        <Preloader />
                    ) : (
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
                                            Surname
                                        </th>
                                        <th scope="col" className="text-center">
                                            Email
                                        </th>
                                        <th scope="col" className="text-center">
                                            Phone
                                        </th>
                                        <th scope="col" className="text-center">
                                            Username
                                        </th>
                                        <th scope="col" className="text-center">
                                            Reset Password
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
                                    {users &&
                                        users.map((data, index) => {
                                            return (
                                                <tr key={data?.id}>
                                                    <th
                                                        scope="row"
                                                        className="text-center"
                                                    >
                                                        {index + 1}
                                                    </th>
                                                    <td className="text-center">
                                                        {data?.name}
                                                    </td>
                                                    <td className="text-center">
                                                        {data?.surname}
                                                    </td>
                                                    <td className="text-center">
                                                        {data?.email}
                                                    </td>
                                                    <td className="text-center">
                                                        {data?.phoneNumber}
                                                    </td>
                                                    <td className="text-center">
                                                        {data?.userName}
                                                    </td>
                                                    <td className="text-center">
                                                        <button
                                                            type="button"
                                                            className="btn btn-info"
                                                            onClick={() =>
                                                                navigate(
                                                                    `/manage/users/resetpassword/${data?.id}`
                                                                )
                                                            }
                                                        >
                                                            Reset Password
                                                        </button>
                                                    </td>
                                                    <td className="text-center">
                                                        <button
                                                            type="button"
                                                            className="btn btn-warning"
                                                            onClick={() =>
                                                                navigate(
                                                                    `/manage/users/update/${data?.id}`
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
                                                                    data?.id
                                                                )
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
                    )}
                </div>
            </div>
        </div>
    );
};

export default Users;
