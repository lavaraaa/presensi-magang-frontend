import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "./components/common/Loading";
import { AuthContext } from "./pages/auth/AuthContext";
import Login from "./pages/auth/Login.jsx";
// ========================================
// ADMIN
// ========================================

import AdminLayout from "./components/layouts/adminLayout/AdminLayout.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard";
import DaftarUser from "./pages/admin/DaftarUser";
import RekapPresensi from "./pages/admin/RekapPresensi.jsx";
// Nanti tinggal aktifkan/import
// import DaftarUser from "./pages/admin/DaftarUser";
// import KelolaPresensi from "./pages/admin/KelolaPresensi";
// import LaporanPresensi from "./pages/admin/LaporanPresensi";


// ========================================
// USER
// ========================================
import UserLayout from "./components/layouts/userLayout/UserLayout.jsx"
import UserDashboard from "./pages/user/UserDashboard";
import Presensi from "./pages/user/Presensi.jsx";
import PresensiKamu from "./pages/user/PresensiKamu.jsx";
// Nanti tinggal aktifkan/import
// import Profil from "./pages/user/Profil";
// import Presensi from "./pages/user/Presensi";
// import RiwayatPresensi from "./pages/user/RiwayatPresensi";


function App() {

    const {
        user,
        loading,
    } = useContext(AuthContext);


    // ========================================
    // LOADING
    // ========================================

    if (loading) {
        return <Loading />;
    }


    // ========================================
    // USER BELUM LOGIN
    // ========================================

    if (!user) {
        return (
            <Routes>

                <Route
                    path="/login"
                    element={<Login />}
                />

                {/* Semua halaman selain login
                    diarahkan ke Login */}

                <Route
                    path="*"
                    element={<Login />}
                />

            </Routes>
        );
    }


    // ========================================
    // ADMIN
    // ========================================

    if (user.role === "admin") {

        return (
            <Routes>

                {/* ==================================
                    ADMIN LAYOUT
                ================================== */}

                <Route path= "/" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />}/>
                <Route path= "dashboard" element={<AdminDashboard />}/>
                <Route path= "daftaruser" element={<DaftarUser />}/>
                <Route path="rekappresensi" element={<RekapPresensi />}/>

                    {/* ==================================
                        KELOLA USER
                    ================================== */}

                    {/*
                    <Route
                        path="daftaruser"
                        element={<DaftarUser />}
                    />
                    */}


                    {/* ==================================
                        KELOLA PRESENSI
                    ================================== */}

                    {/*
                    <Route
                        path="presensi"
                        element={<KelolaPresensi />}
                    />
                    */}


                    {/* ==================================
                        LAPORAN
                    ================================== */}

                    {/*
                    <Route
                        path="laporan"
                        element={<LaporanPresensi />}
                    />
                    */}

                </Route>

            </Routes>
        );
    }


    // ========================================
    // USER
    // ========================================

       return (
    <Routes>

        <Route path="/" element={<UserLayout />}>

            <Route
                index
                element={<UserDashboard />}
            />

            <Route
                path="dashboard"
                element={<UserDashboard />}
            />

 <Route
        path="presensi"
        element={<Presensi />}
    />

<Route
    path="presensi-kamu"
    element={<PresensiKamu />}
/>
        </Route>

    </Routes>
);
}


export default App;