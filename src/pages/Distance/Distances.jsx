import axios from "axios";
import { useEffect, useState } from "react";
import Table from "../../components/Table";
import { toast } from "react-toastify";
import { useUserContext } from "../../userContext";
import { apilink } from "../../constants";
import Preloader from "../../components/Preloader";
import { useNavigate } from "react-router-dom";

const Distances = () => {
    const [distances, setDistances] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const { user } = useUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await axios.get(apilink + "/distances/", {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });

                setDistances(data);
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

    const handleDelete = async (id) => {
        setIsLoading(true);

        try {
            const { data } = await axios.delete(apilink + `/distances/${id}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });

            setDistances(data);
            toast.success("Deleted!");
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
        <Table
            entity="Distances"
            data={distances}
            handleDelete={handleDelete}
        />
    );
};

export default Distances;
