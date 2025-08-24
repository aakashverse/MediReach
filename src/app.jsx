import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import './style.css';
import Home from "./components/Home.jsx";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import Report from "./components/Report.jsx";
import AnalyzeImage from "./components/AnalyzeImage.jsx";
import AnalyzePrompt from "./components/AnalyzePrompt.jsx";

function App(){

    return(
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/signup" element={<Signup/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/profile" element={<Report/>}></Route>
                <Route path="/analyze-image" element={<AnalyzeImage/>}></Route>
                <Route path="/analyze-text" element={<AnalyzePrompt/>}></Route>
            </Routes>
        </BrowserRouter>
        </>
    )
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);