import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "./components/common/Loading";
import { AuthContext } from "./pages/auth/AuthContext";
import Login from "./pages/auth/Login.jsx";

// ADMIN

import AdminLayout from "./components/layouts/adminLayout/AdminLayout.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard";
import DaftarUser from "./pages/admin/DaftarUser";
import RekapPresensi from "./pages/admin/RekapPresensi.jsx";

// USER

import UserLayout from "./components/layouts/userLayout/UserLayout.jsx"
import UserDashboard from "./pages/user/UserDashboard";
import Presensi from "./pages/user/Presensi.jsx";
import PresensiKamu from "./pages/user/PresensiKamu.jsx";

function App() {
    const {
        user,
        loading,
    } = useContext(AuthContext);
    if (loading) {
        return <Loading />;
    }

    if (!user) {
        return (
            <Routes>

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="*"
                    element={<Login />}
                />
            </Routes>
        );
    }
    if (user.role === "admin") {

        return (
            <Routes>
                <Route path= "/" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />}/>
                <Route path= "dashboard" element={<AdminDashboard />}/>
                <Route path= "daftaruser" element={<DaftarUser />}/>
                <Route path="rekappresensi" element={<RekapPresensi />}/>
                </Route>
            </Routes>
        );
    }

       return (
    <Routes>
        <Route path="/" element={<UserLayout />}>
        <Route index element={<UserDashboard />}/>
        <Route path="dashboard" element={<UserDashboard />}/>
        <Route path="presensi" element={<Presensi />}/>
        <Route path="presensi-kamu" element={<PresensiKamu />}/>
    </Route>
    </Routes>
);
}

export default App;