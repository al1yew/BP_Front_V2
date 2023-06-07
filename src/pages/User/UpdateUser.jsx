import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../../userContext";
import { apilink } from "../../constants";
import Preloader from "../../components/Preloader";

const UpdateUser = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);

    const [updateUser, setUpdateUser] = useState({
        name: "",
        surname: "",
        userName: "",
        email: "",
        phoneNumber: "",
        id: "",
    });

    const { user } = useUserContext();

    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await axios.get(apilink + `/users/${id}`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });

                setUpdateUser(data);
            } catch (error) {
                const errorMsg = error?.response?.data;
                toast.error(errorMsg);
                navigate(-1);
            } finally {
                setIsLoading(false);
            }
        };

        getData();
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;

        setUpdateUser((prevValue) => {
            return {
                ...prevValue,
                [name]: value,
            };
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await axios.put(apilink + `/users/${id}`, updateUser, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });

            toast.success("Updated!");
            navigate(-1, { delay: 200 });
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

    return isLoading ? (
        <Preloader />
    ) : (
        <section className="manipulateuser">
            <div className="container">
                <form className="row all" onSubmit={handleSubmit}>
                    <div className="col-lg-5-8 col-md-5-8 col-5-8">
                        <label
                            htmlFor="name"
                            className="col-lg-12 col-md-12 col-12"
                        >
                            Name
                        </label>
                        <input
                            className="col-lg-12 col-md-12 col-12 form-control"
                            name="name"
                            id="name"
                            type="text"
                            required={true}
                            onChange={handleChange}
                            value={updateUser.name}
                            autoFocus
                        />
                    </div>
                    <div className="col-lg-5-8 col-md-5-8 col-5-8">
                        <label
                            htmlFor="surname"
                            className="col-lg-12 col-md-12 col-12"
                        >
                            Surname
                        </label>
                        <input
                            className="col-lg-12 col-md-12 col-12 form-control"
                            name="surname"
                            id="surname"
                            type="text"
                            required={true}
                            onChange={handleChange}
                            value={updateUser.surname}
                        />
                    </div>
                    <div className="col-lg-5-8 col-md-5-8 col-5-8">
                        <label
                            htmlFor="userName"
                            className="col-lg-12 col-md-12 col-12"
                        >
                            Username
                        </label>
                        <input
                            className="col-lg-12 col-md-12 col-12 form-control"
                            name="userName"
                            id="userName"
                            type="text"
                            required={true}
                            onChange={handleChange}
                            value={updateUser.userName}
                        />
                    </div>
                    <div className="col-lg-5-8 col-md-5-8 col-5-8">
                        <label
                            htmlFor="email"
                            className="col-lg-12 col-md-12 col-12"
                        >
                            Email
                        </label>
                        <input
                            className="col-lg-12 col-md-12 col-12 form-control"
                            name="email"
                            id="email"
                            type="email"
                            required={true}
                            onChange={handleChange}
                            value={updateUser.email}
                        />
                    </div>
                    <div className="col-lg-5-8 col-md-5-8 col-5-8">
                        <label
                            htmlFor="phoneNumber"
                            className="col-lg-12 col-md-12 col-12"
                        >
                            Phone Number
                        </label>
                        <input
                            className="col-lg-12 col-md-12 col-12 form-control"
                            name="phoneNumber"
                            id="phoneNumber"
                            type="text"
                            onChange={handleChange}
                            value={updateUser.phoneNumber}
                        />
                    </div>
                    <button
                        className="col-lg-5-8 col-md-5-8 col-5-8 btn btn-success"
                        type="submit"
                    >
                        Update
                    </button>
                </form>
            </div>
        </section>
    );
};

export default UpdateUser;
