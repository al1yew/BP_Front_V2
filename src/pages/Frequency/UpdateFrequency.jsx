import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserContext } from "../../userContext";
import { apilink } from "../../constants";
import Preloader from "../../components/Preloader";

const UpdateFrequency = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useUserContext();
    const [updateValue, setUpdateValue] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await axios.get(
                    apilink + `/frequencies/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        },
                    }
                );

                setUpdateValue(data?.name);
                setIsLoading(false);
            } catch (error) {
                const errorMsg = error?.response?.data;
                toast.error(errorMsg);
                navigate(-1);
                setIsLoading(false);
            }
        };

        getData();
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);

        let obj = {
            name: updateValue,
            id,
        };

        const postData = async () => {
            try {
                const { data } = await axios.put(
                    apilink + "/frequencies/" + id,
                    obj,
                    {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        },
                    }
                );

                toast.success("Updated!");
                setTimeout(() => {
                    navigate(-1);
                }, 200);
                setIsLoading(false);
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
                setIsLoading(false);
            }
        };

        postData();
    }

    return (
        <section className="create_update_entity">
            {isLoading ? (
                <Preloader />
            ) : (
                <div className="container">
                    <div className="row all">
                        <p className="col-lg-12 col-md-12 col-12">
                            Write down the name of the Frequency that you want
                            to update. It will be displayed in the table.
                        </p>
                        <form
                            onSubmit={handleSubmit}
                            className="col-lg-5 col-md-6 col-10"
                        >
                            <input
                                type="text"
                                required={true}
                                onChange={(e) => setUpdateValue(e.target.value)}
                                value={updateValue}
                                name="name"
                                className="col-lg-8 col-md-8 col-8"
                                autoFocus
                            />
                            <button
                                type="submit"
                                id="submitBtn"
                                className="btn btn-success col-3-5 col-md-3-5 col-lg-3-5"
                            >
                                Update
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
};

export default UpdateFrequency;
