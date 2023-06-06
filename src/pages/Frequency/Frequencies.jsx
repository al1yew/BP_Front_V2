import axios from "axios";
import { useEffect, useState } from "react";
import Table from "../../components/Table";
import { toast } from "react-toastify";
import { useUserContext } from "../../userContext";
import { apilink } from "../../constants";
import Preloader from "../../components/Preloader";

export default function Frequencies() {
    const [frequencies, setFrequencies] = useState(null);
    const [isLoading, setIsloading] = useState(true);

    const { user } = useUserContext();

    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await axios.get(apilink + "/frequencies/", {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });

                setFrequencies(data);
                setIsloading(false);
            } catch (error) {
                const errorMsg = error?.response?.data;
                toast.error(errorMsg);
                navigate(-1);
                setIsloading(false);
            }
        };

        getData();
    }, []);

    const handleDelete = async (id) => {
        try {
            const { data } = await axios.delete(
                apilink + `/frequencies/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );

            setFrequencies(data);
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
        }
    };

    return isLoading ? (
        <Preloader />
    ) : (
        <div className="tablekeeper">
            <div className="container">
                <Table
                    entity="Frequencies"
                    data={frequencies}
                    handleDelete={handleDelete}
                />
            </div>
        </div>
    );
}
