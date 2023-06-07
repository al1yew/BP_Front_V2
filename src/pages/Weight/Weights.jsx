import axios from "axios";
import { useEffect, useState } from "react";
import Table from "../../components/Table";
import { toast } from "react-toastify";
import { useUserContext } from "../../userContext";
import { apilink } from "../../constants";
import Preloader from "../../components/Preloader";

const Weights = () => {
    const [weights, setWeights] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const { user } = useUserContext();

    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await axios.get(apilink + "/weights/", {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });

                setWeights(data);
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

    const handleDelete = async (id) => {
        setIsLoading(true);

        try {
            const { data } = await axios.delete(apilink + `/weights/${id}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });

            setWeights(data);
            toast.success("Deleted!");
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
        <Table entity="Weights" data={weights} handleDelete={handleDelete} />
    );
};

export default Weights;
