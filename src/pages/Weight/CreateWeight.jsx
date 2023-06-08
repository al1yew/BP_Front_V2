import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserContext } from "../../userContext";
import { apilink } from "../../constants";
import Preloader from "../../components/Preloader";

const CreateWeight = () => {
    const navigate = useNavigate();
    const { user } = useUserContext();
    const [createValue, setCreateValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await axios.post(
                apilink + "/weights",
                { name: createValue },
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );

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
        <section className="create_update_entity">
            <div className="container">
                <div className="row all">
                    <p className="col-lg-12 col-md-12 col-12">
                        Write down the name of the Weight that you want to
                        create. It will be displayed in the table.
                    </p>
                    <form
                        onSubmit={handleSubmit}
                        className="col-lg-5 col-md-8 col-10"
                    >
                        <input
                            type="text"
                            required={true}
                            onChange={(e) => setCreateValue(e.target.value)}
                            value={createValue}
                            name="name"
                            className="col-lg-8 col-md-8 col-8"
                            placeholder="Weight"
                            autoFocus
                        />
                        <button
                            type="submit"
                            id="submitBtn"
                            className="btn btn-success col-3-5 col-md-3-5 col-lg-3-5"
                        >
                            Create
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default CreateWeight;
