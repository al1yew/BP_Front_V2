import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import MakeAssessment from "./pages/MakeAssessment";
import Assess from "./pages/Assess";
import NotFound from "./pages/NotFound";

function App() {
    return (
        <>
            <BrowserRouter>
                <Header />
                <main>
                    <Routes>
                        <Route path="/manage" element={<Home />} />

                        <Route path="/" element={<Assess />} />

                        <Route path="/doassess" element={<MakeAssessment />} />

                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
                <Footer />
            </BrowserRouter>
            <ToastContainer autoClose={1000} closeOnClick />
        </>
    );
}

export default App;
