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
import UpdateDistance from "./pages/Distance/UpdateDistance";
import CreateDistance from "./pages/Distance/CreateDistance";
import Distances from "./pages/Distance/Distances";
import Weights from "./pages/Weight/Weights";
import UpdateWeight from "./pages/Weight/UpdateWeight";
import CreateWeight from "./pages/Weight/CreateWeight";
import Users from "./pages/User/Users";
import CreateUser from "./pages/User/CreateUser";
import UpdateUser from "./pages/User/UpdateUser";
import ResetPassword from "./pages/User/ResetPassword";
import UpdateLoggedUser from "./pages/User/UpdateLoggedUser";
import Assessments from "./pages/Assessment/Assessments";
import CreateAssessment from "./pages/Assessment/CreateAssessment";
import UpdateAssessment from "./pages/Assessment/UpdateAssessment";

function App() {
    //izza togo sht omoy preloader na ves ekran, nado eshe handle delat te situacii koqda apiden entity gelmir
    //naprimer vizivayu distances, a ix net, a xochetsa je create sdelat. poetomu orda if sherti goyacam i yoxlayacam.
    //a mojet api den nese qaytarmaq laizmdi vashe
    //data gelmese empty array gelir, if sherti yazmag lazidmi vse create button goymag

    //assessments zakinul v global context kakoy to cunki mi dostayem odin i tot je axios.get(/assessments)
    //vezde, i v "/", i v "manage/assessments" a takje v create i update. Zacem stolko muchat api? medlenno je

    //zakoncheno, no nado bi protestirovat vse (2 raza protestiroval, vse rabotayet, loader bez problem)

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

                                <Route
                                    path="/manage/distances"
                                    element={<Distances />}
                                />
                                <Route
                                    path="/manage/distances/create"
                                    element={<CreateDistance />}
                                />
                                <Route
                                    path="/manage/distances/update/:id"
                                    element={<UpdateDistance />}
                                />

                                <Route
                                    path="/manage/weights"
                                    element={<Weights />}
                                />
                                <Route
                                    path="/manage/weights/create"
                                    element={<CreateWeight />}
                                />
                                <Route
                                    path="/manage/weights/update/:id"
                                    element={<UpdateWeight />}
                                />

                                <Route
                                    path="/manage/users"
                                    element={<Users />}
                                />
                                <Route
                                    path="/manage/users/create"
                                    element={<CreateUser />}
                                />
                                <Route
                                    path="/manage/users/update/:id"
                                    element={<UpdateUser />}
                                />
                                <Route
                                    path="/manage/users/resetpassword/:id"
                                    element={<ResetPassword />}
                                />
                                <Route
                                    path="/manage/account/update/:username"
                                    element={<UpdateLoggedUser />}
                                />

                                <Route
                                    path="/manage/assessments"
                                    element={<Assessments />}
                                />
                                <Route
                                    path="/manage/assessments/create"
                                    element={<CreateAssessment />}
                                />
                                <Route
                                    path="/manage/assessments/update/:id"
                                    element={<UpdateAssessment />}
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

                        <Route
                            path="/manage/users/create"
                            element={<CreateUser />}
                        />
                    </Routes>
                </main>
                <Footer />
            </BrowserRouter>
            <ToastContainer
                position="bottom-center"
                autoClose={1200}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable={false}
                pauseOnHover={false}
                theme="dark"
            />
        </>
    );
}

export default App;
