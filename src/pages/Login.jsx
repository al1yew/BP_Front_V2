import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import photo from "../assets/images/bp_logo_login.png";
import { toast } from "react-toastify";
import { apilink } from "../constants";
import { useUserContext } from "../userContext";
import Preloader from "../components/Preloader";

const Login = () => {
    const [formData, setFormData] = useState({
        login: "",
        password: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useUserContext();

    const navigate = useNavigate();

    function handleChange(e) {
        const { name, value } = e.target;

        setFormData((prevValue) => {
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
            const { data } = await axios.post(
                apilink + "/accounts/login",
                formData
            );

            login(data);
            toast.success(`Welcome, ${data.name}`);
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

    return isLoading ? (
        <Preloader />
    ) : (
        <section className="login">
            <div className="container">
                <div className="row all">
                    <div className="col-lg-2 col-md-3 col-4">
                        <img className="img-fluid" src={photo} alt="" />
                    </div>
                    <form
                        className="col-lg-4 col-md-8 col-12 loginDiv"
                        onSubmit={handleSubmit}
                    >
                        <p className="col-lg-12 col-md-12 col-12">
                            Welcome dear Admin! Sign in to continue:
                        </p>

                        <div className="col-lg-12 col-md-12 col-12">
                            <input
                                required={true}
                                value={formData.login}
                                onChange={handleChange}
                                type="text"
                                id="login"
                                name="login"
                                className="col-lg-12 col-md-12 col-12 "
                                placeholder="Email or Username"
                                autoFocus
                                autoComplete="username"
                            />
                        </div>

                        <div className="col-lg-12 col-md-12 col-12">
                            <input
                                required={true}
                                value={formData.password}
                                onChange={handleChange}
                                type="password"
                                id="password"
                                name="password"
                                minLength={8}
                                placeholder="Your Password"
                                className="col-lg-12 col-md-12 col-12"
                                autoComplete="current-password"
                            />
                        </div>

                        <button className="btn btn-success">Log in</button>
                    </form>
                </div>
            </div>
        </section>
    );
};
export default Login;
