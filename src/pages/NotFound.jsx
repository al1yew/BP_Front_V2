import { Link } from "react-router-dom";
import { useUserContext } from "../userContext";

const NotFound = () => {
    const { user } = useUserContext();

    return (
        <section className="notfound">
            <div className="container">
                <div className="row all">
                    <p>PAGE IS NOT FOUND!</p>
                    <Link to="/">Go to Assessment Page</Link>
                    {user && <Link to="/manage">visit Admin page</Link>}
                </div>
            </div>
        </section>
    );
};
export default NotFound;
