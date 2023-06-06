import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import MakeAssessment from "./pages/MakeAssessment";
import Assess from "./pages/Assess";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import { useUserContext } from "./userContext";
import Frequencies from "./pages/Frequency/Frequencies";
import UpdateFrequency from "./pages/Frequency/UpdateFrequency";
import CreateFrequency from "./pages/Frequency/CreateFrequency";

function App() {
    //dropdown otlichayetsa koordinalno
    //header toje otlichayetsa
    //table nado uncomment
    //create folder nado dobavit tam manipulate entity est

    //context tot je daje luchhse

    //assess gotov
    //make assessment gotov
    //not found gotov
    //home manage gotov - eto prosto home.jsx
    //login gotov proverit nado

    const { user } = useUserContext();

    return (
        <>
            <BrowserRouter>
                <Header />
                <main>
                    <Routes>
                        {user && (
                            <>
                                <Route path="/manage" element={<Home />} />

                                <Route
                                    path="/manage/frequencies"
                                    element={<Frequencies />}
                                />
                                <Route
                                    path="/manage/frequencies/create"
                                    element={<CreateFrequency />}
                                />
                                <Route
                                    path="/manage/frequencies/update/:id"
                                    element={<UpdateFrequency />}
                                />
                            </>
                        )}

                        <Route path="/" element={<Assess />} />

                        <Route path="/doassess" element={<MakeAssessment />} />

                        <Route path="*" element={<NotFound />} />

                        <Route
                            path="/manage/account/login"
                            element={<Login />}
                        />
                    </Routes>
                </main>
                <Footer />
            </BrowserRouter>
            <ToastContainer
                autoClose={1000}
                closeOnClick
                pauseOnHover={false}
            />
        </>
    );
}

export default App;
