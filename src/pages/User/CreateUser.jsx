import { useContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../userContext";
import { apilink } from "../../constants";
import Preloader from "../../components/Preloader";

const CreateUser = () => {
    const [newUser, setNewUser] = useState({
        name: "",
        surname: "",
        userName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
    });

    const [isLoading, setIsLoading] = useState(false);

    const { user } = useUserContext();

    const navigate = useNavigate();

    function handleChange(e) {
        const { name, value } = e.target;

        setNewUser((prevValue) => {
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
            await axios.post(apilink + "/users", newUser, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });

            toast.success("Created!");
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
                            value={newUser.name}
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
                            value={newUser.surname}
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
                            value={newUser.userName}
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
                            value={newUser.email}
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
                            value={newUser.phoneNumber}
                        />
                    </div>
                    <div className="col-lg-5-8 col-md-5-8 col-5-8">
                        <label
                            htmlFor="password"
                            className="col-lg-12 col-md-12 col-12"
                        >
                            Password
                        </label>
                        <input
                            className="col-lg-12 col-md-12 col-12 form-control"
                            name="password"
                            id="password"
                            type="password"
                            required={true}
                            onChange={handleChange}
                            value={newUser.password}
                        />
                    </div>
                    <div className="col-lg-5-8 col-md-5-8 col-5-8">
                        <label
                            htmlFor="confirmPassword"
                            className="col-lg-12 col-md-12 col-12"
                        >
                            Confirm Password
                        </label>
                        <input
                            className="col-lg-12 col-md-12 col-12 form-control"
                            name="confirmPassword"
                            id="confirmPassword"
                            type="password"
                            required={true}
                            onChange={handleChange}
                            value={newUser.confirmPassword}
                        />
                    </div>
                    <button
                        className="col-lg-5-8 col-md-5-8 col-5-8 btn btn-success"
                        type="submit"
                    >
                        Create
                    </button>
                </form>
            </div>
        </section>
    );
};

export default CreateUser;
