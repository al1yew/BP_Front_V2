import { Link } from "react-router-dom";

const Home = () => {
    return (
        <section className="adminhome">
            <div className="container">
                <div className="row all">
                    <Link to="/manage/assessments" className="link">
                        Assessments
                    </Link>
                    <Link to="/manage/frequencies" className="link">
                        Frequencies
                    </Link>
                    <Link to="/manage/weights" className="link">
                        Weights
                    </Link>
                    <Link to="/manage/distances" className="link">
                        Distances
                    </Link>
                    <Link to="/manage/users" className="link">
                        Users
                    </Link>
                    <Link to="/manage/usersassessments" className="link">
                        Assessments of Users
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Home;
