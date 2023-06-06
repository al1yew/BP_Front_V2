import { Link } from "react-router-dom";

const Home = () => {
    return (
        <section className="adminhome">
            <div className="container">
                <div className="row all">
                    <Link
                        to="/manage/assessments"
                        className="link col-lg-2-5 col-md-3-5 col-5-5"
                    >
                        Assessments
                    </Link>
                    <Link
                        to="/manage/frequencies"
                        className="link col-lg-2-5 col-md-3-5 col-5-5"
                    >
                        Frequencies
                    </Link>
                    <Link
                        to="/manage/weights"
                        className="link col-lg-2-5 col-md-3-5 col-5-5"
                    >
                        Weights
                    </Link>
                    <Link
                        to="/manage/distances"
                        className="link col-lg-2-5 col-md-3-5 col-5-5"
                    >
                        Distances
                    </Link>
                    <Link
                        to="/manage/users"
                        className="link col-lg-2-5 col-md-3-5 col-5-5"
                    >
                        Users
                    </Link>
                    <Link
                        to="/manage/usersassessments"
                        className="link col-lg-2-5 col-md-3-5 col-5-5"
                    >
                        Assessments of Users
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Home;
