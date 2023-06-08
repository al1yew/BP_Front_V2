import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { apilink } from "../../constants";
import { useUserContext } from "../../userContext";
import Preloader from "../../components/Preloader";

const UpdateLoggedUser = () => {
    const { username } = useParams();

    const [updateUser, setUpdateUser] = useState({
        name: "",
        surname: "",
        userName: "",
        email: "",
        phoneNumber: "",
        id: "",
    });

    const [password, setPassword] = useState({
        password: "",
        confirmPassword: "",
    });

    const [isLoading, setIsLoading] = useState(true);

    const { user, login } = useUserContext();

    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await axios.get(apilink + "/users/getbyname", {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                    params: {
                        username: username,
                    },
                });

                setUpdateUser(data);
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
                navigate("/manage");
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

    function handlePasswordChange(e) {
        const { name, value } = e.target;

        setPassword((prevValue) => {
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
            await axios.put(apilink + `/users/${updateUser.id}`, updateUser, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });

            login({
                ...user,
                name: updateUser.name,
                surname: updateUser.surname,
                userName: updateUser.userName,
                email: updateUser.email,
            });

            toast.success("You Are Updated!");
            navigate("/manage");
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

    const handlePasswordForm = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        let obj = {
            id: updateUser.id,
            newPassword: password.password,
            confirmNewPassword: password.confirmPassword,
        };

        try {
            await axios.post(apilink + "/users/resetpassword", obj, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });

            toast.success("Password is changed!");
            navigate("/manage");
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

    return isLoading ? (
        <Preloader />
    ) : (
        <section className="manipulateuser">
            <div className="container">
                <form className="row all" onSubmit={handleSubmit}>
                    <div className="col-lg-5-8 col-5-8">
                        <label htmlFor="name" className="col-lg-12 col-12">
                            Name
                        </label>
                        <input
                            className="col-lg-12 col-12 form-control"
                            name="name"
                            id="name"
                            type="text"
                            required={true}
                            onChange={handleChange}
                            value={updateUser.name}
                            autoFocus
                        />
                    </div>
                    <div className="col-lg-5-8 col-5-8">
                        <label htmlFor="surname" className="col-lg-12 col-12">
                            Surname
                        </label>
                        <input
                            className="col-lg-12 col-12 form-control"
                            name="surname"
                            id="surname"
                            type="text"
                            required={true}
                            onChange={handleChange}
                            value={updateUser.surname}
                        />
                    </div>
                    <div className="col-lg-5-8 col-5-8">
                        <label htmlFor="userName" className="col-lg-12 col-12">
                            Username
                        </label>
                        <input
                            className="col-lg-12 col-12 form-control"
                            name="userName"
                            id="userName"
                            type="text"
                            required={true}
                            onChange={handleChange}
                            value={updateUser.userName}
                        />
                    </div>
                    <div className="col-lg-5-8 col-5-8">
                        <label htmlFor="email" className="col-lg-12 col-12">
                            Email
                        </label>
                        <input
                            className="col-lg-12 col-12 form-control"
                            name="email"
                            id="email"
                            type="email"
                            required={true}
                            onChange={handleChange}
                            value={updateUser.email}
                        />
                    </div>
                    <div className="col-lg-5-8 col-5-8">
                        <label
                            htmlFor="phoneNumber"
                            className="col-lg-12 col-12"
                        >
                            Phone Number
                        </label>
                        <input
                            className="col-lg-12 col-12 form-control"
                            name="phoneNumber"
                            id="phoneNumber"
                            type="text"
                            onChange={handleChange}
                            value={updateUser.phoneNumber}
                        />
                    </div>
                    <button
                        className="col-lg-5-8 col-5-8 btn btn-success"
                        type="submit"
                    >
                        Change Info
                    </button>
                </form>
                <hr />
                <form
                    className="row passworddropdown col-lg-12 col-12"
                    onSubmit={handlePasswordForm}
                >
                    <div className="col-lg-5-8 col-5-8">
                        <label htmlFor="password" className="col-lg-12 col-12">
                            Password
                        </label>
                        <input
                            className="col-lg-12 col-12 form-control"
                            name="password"
                            id="password"
                            type="password"
                            required={true}
                            onChange={handlePasswordChange}
                            value={password.password}
                        />
                    </div>
                    <div className="col-lg-5-8 col-5-8">
                        <label
                            htmlFor="confirmPassword"
                            className="col-lg-12 col-12"
                        >
                            Confirm Password
                        </label>
                        <input
                            className="col-lg-12 col-12 form-control"
                            name="confirmPassword"
                            id="confirmPassword"
                            type="password"
                            required={true}
                            onChange={handlePasswordChange}
                            value={password.confirmPassword}
                        />
                    </div>
                    <button
                        className="col-lg-5-8 col-5-8 btn btn-success"
                        type="submit"
                    >
                        Change Password
                    </button>
                </form>
            </div>
        </section>
    );
};

export default UpdateLoggedUser;
