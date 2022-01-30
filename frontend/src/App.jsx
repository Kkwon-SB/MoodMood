import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import DiaryWrite from "./pages/DiaryWrite";
import Me from "./pages/Me";

import Main from "./pages/Main";
import FOF from "./pages/FOF";
import DiaryDetails from "./pages/DiaryDetails";
import DiaryList from "./pages/DiaryList";
import SympDiaryList from "./pages/SympDiaryList";
import OpenBoard from "./pages/OpenBoard";

const App = () => {
    return (
        <>
            <CssBaseline />
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="signin" element={<SignIn />} />
                <Route path="signup" element={<SignUp />} />
                <Route path="me" element={<Me />} />
                <Route path="diary" element={<DiaryList />} />
                <Route path="diary/write" element={<DiaryWrite />} />
                <Route path="diary/done" element={<DiaryDetails />} />
                <Route path="diary/symp" element={<SympDiaryList />} />
                <Route path="diary/opened" element={<OpenBoard />} />
                <Route path="*" element={<FOF />} />
            </Routes>
        </>
    );
};

export default App;
