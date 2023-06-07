import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../../userContext";
import { apilink } from "../../constants";
import Preloader from "../../components/Preloader";

const ResetPassword = () => {
    const { id } = useParams();

    const [reset, setReset] = useState({
        newPassword: "",
        confirmNewPassword: "",
    });

    const [isLoading, setIsLoading] = useState(false);

    const { user } = useUserContext();

    const navigate = useNavigate();

    function handleChange(e) {
        const { name, value } = e.target;

        setReset((prevValue) => {
            return {
                ...prevValue,
                [name]: value,
            };
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        let obj = {
            id,
            newPassword: reset.newPassword,
            confirmNewPassword: reset.confirmNewPassword,
        };

        try {
            await axios.post(apilink + "/users/resetpassword", obj, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });

            toast.success("Password is changed!");
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
        <section className="resetpassword">
            <div className="container">
                <form className="row all" onSubmit={handleSubmit}>
                    <div className="col-lg-5-8 col-md-5-8 col-5-8">
                        <label
                            htmlFor="newPassword"
                            className="col-lg-12 col-md-12 col-12"
                        >
                            New Password
                        </label>
                        <input
                            className="col-lg-12 col-md-12 col-12 form-control"
                            name="newPassword"
                            id="newPassword"
                            type="password"
                            onChange={handleChange}
                            value={reset.newPassword}
                        />
                    </div>
                    <div className="col-lg-5-8 col-md-5-8 col-5-8">
                        <label
                            htmlFor="confirmNewPassword"
                            className="col-lg-12 col-md-12 col-12"
                        >
                            Confirm Password
                        </label>
                        <input
                            className="col-lg-12 col-md-12 col-12 form-control"
                            name="confirmNewPassword"
                            id="confirmNewPassword"
                            type="password"
                            onChange={handleChange}
                            value={reset.confirmNewPassword}
                        />
                    </div>
                    <button
                        className="col-lg-5-8 col-md-5-8 col-5-8 btn btn-success"
                        type="submit"
                    >
                        Reset
                    </button>
                </form>
            </div>
        </section>
    );
};

export default ResetPassword;
