import axios from "axios";
import { useEffect, useState } from "react";
import Dropdown from "../../components/Dropdown";
import { toast } from "react-toastify";
import { useUserContext } from "../../userContext";
import { apilink } from "../../constants";
import Preloader from "../../components/Preloader";
import { useNavigate } from "react-router-dom";

const CreateAssessment = () => {
    const [options, setOptions] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const [values, setValues] = useState({
        distanceId: 0,
        frequencyId: 0,
        weightId: 0,
        needToAssess: false,
    });

    const { user } = useUserContext();

    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await axios.get(apilink + "/assessments");

                setOptions(data.options);
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
                navigate(-1);
            } finally {
                setIsLoading(false);
            }
        };

        getData();
    }, []);

    function handleChange(id, entity) {
        setValues((prevValue) => {
            return {
                ...prevValue,
                [`${entity.toLowerCase()}Id`]: id,
            };
        });
    }

    const handleSpanClick = async (needToAssess) => {
        setIsLoading(true);

        let obj = { ...values, needToAssess };

        try {
            await axios.post(apilink + "/assessments", obj, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });

            toast.success("Created!");
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
        <section className="assess">
            <div className="container">
                <div className="row all">
                    <p className="col-lg-12 col-md-12 col-12">
                        Select your options from the dropdowns below in order to
                        decide whether take an assessment or not. <br />
                        Information will be passed to database and will be used
                        in User side.
                    </p>
                    <div className="cont col-lg-12 col-md-12 col-12">
                        <div className="col-lg-3-8 col-md-3-8 col-3-8 allkeeper">
                            <label>Weights</label>
                            <Dropdown
                                query={options?.weights}
                                selectedValue={
                                    values.weightId === 0
                                        ? "Weight"
                                        : options?.weights.find(
                                              (x) => x.id === values.weightId
                                          ).name
                                }
                                entityName="Weight"
                                handleChange={handleChange}
                            />
                        </div>
                        <div className="col-lg-3-8 col-md-3-8 col-3-8 allkeeper">
                            <label>Distances</label>
                            <Dropdown
                                query={options?.distances}
                                selectedValue={
                                    values.distanceId === 0
                                        ? "Distance"
                                        : options?.distances.find(
                                              (x) => x.id === values.distanceId
                                          ).name
                                }
                                entityName="Distance"
                                handleChange={handleChange}
                            />
                        </div>
                        <div className="col-lg-3-8 col-md-3-8 col-3-8 allkeeper">
                            <label>Frequencies</label>
                            <Dropdown
                                query={options?.frequencies}
                                selectedValue={
                                    values.frequencyId === 0
                                        ? "Frequency"
                                        : options?.frequencies.find(
                                              (x) => x.id === values.frequencyId
                                          ).name
                                }
                                entityName="Frequency"
                                handleChange={handleChange}
                            />
                        </div>

                        <span
                            className="col-lg-4 col-md-5-8 col-5-8 btn btn-primary"
                            onClick={() => handleSpanClick(true)}
                        >
                            Need to Assess
                        </span>
                        <span
                            className="col-lg-4 col-md-5-8 col-5-8 btn btn-danger"
                            onClick={() => handleSpanClick(false)}
                        >
                            No Need to Assess
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CreateAssessment;
