import axios from "axios";
import { useEffect, useState } from "react";
import Dropdown from "../components/Dropdown";
import { apilink } from "../constants";
import Preloader from "../components/Preloader";
import { toast } from "react-toastify";

export default function Assess() {
    const [data, setData] = useState(null);
    const [result, setResult] = useState(0);

    const [values, setValues] = useState({
        distanceId: 0,
        frequencyId: 0,
        weightId: 0,
    });

    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await axios.get(
                    apilink + "/assessments/getalldata"
                );

                setData(data);
            } catch (error) {
                toast.error(error.message);
            }
        };

        getData();
    }, []);

    function handleChange(id, entity) {
        setValues((prevValue) => {
            return {
                ...prevValue,
                [entity.toLowerCase().concat("Id")]: id,
            };
        });
    }

    function handleSubmit() {
        const postData = async () => {
            try {
                const { data } = await axios.post(
                    apilink + "/assessments/makeassessment",
                    values
                );

                setResult(data);
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
            }
        };

        postData();
    }

    return data ? (
        <section className="assess">
            <div className="container">
                <div className="row all">
                    <p className="col-lg-12 col-md-12 col-12">
                        Select your options from the dropdowns below in order to
                        decide whether to take an assessment or not.
                    </p>
                    <div className="cont col-lg-12 col-md-12 col-12">
                        <div className="col-lg-3-8 col-md-3-8 col-3-8 allkeeper">
                            <label>Weights</label>
                            <Dropdown
                                query={data.weights}
                                name={"Weight"}
                                handleChange={handleChange}
                            />
                        </div>
                        <div className="col-lg-3-8 col-md-3-8 col-3-8 allkeeper">
                            <label>Distances</label>
                            <Dropdown
                                query={data.distances}
                                name={"Distance"}
                                handleChange={handleChange}
                            />
                        </div>
                        <div className="col-lg-3-8 col-md-3-8 col-3-8 allkeeper">
                            <label>Frequencies</label>
                            <Dropdown
                                query={data.frequencies}
                                name={"Frequency"}
                                handleChange={handleChange}
                            />
                        </div>

                        <div className="col-lg-12 col-12 resultkeeper">
                            <span
                                className="col-lg-12 col-md-12 col-12 btn btn-success"
                                onClick={handleSubmit}
                            >
                                Find out!
                            </span>
                            {result == 2 && (
                                <span className="col-lg-12 col-md-12 col-12 resultspantrue btn btn-danger">
                                    You need to take an assessment. Click here.
                                </span>
                            )}
                            {result == 1 && (
                                <span className="col-lg-12 col-md-12 col-12 resultspanfalse">
                                    You DO NOT need to take an assessment.
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    ) : (
        <Preloader />
    );
}
