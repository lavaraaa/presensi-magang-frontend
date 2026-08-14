import React, {
    useContext,
    useEffect,
    useState,
} from "react";

import axios from "axios";

import { AuthContext } from "../../pages/auth/AuthContext";


const UserDashboard = () => {

    const { user } =
        useContext(AuthContext);


    // ========================================
    // STATISTIK PRESENSI
    // ========================================

    const [totalHadir, setTotalHadir] =
        useState(0);

    const [hadirHariIni, setHadirHariIni] =
        useState(0);

    const [totalSakit, setTotalSakit] =
        useState(0);

    const [totalIzin, setTotalIzin] =
        useState(0);

    const [totalTidakHadir, setTotalTidakHadir] =
        useState(0);

    const [loading, setLoading] =
        useState(true);


    // ========================================
    // TANGGAL HARI INI
    // ========================================

    const today = new Date();

    const tanggalHariIni =
        `${today.getFullYear()}-${String(
            today.getMonth() + 1
        ).padStart(2, "0")}-${String(
            today.getDate()
        ).padStart(2, "0")}`;


    // ========================================
    // AMBIL DATA PRESENSI
    // ========================================

    const fetchPresensi = async () => {

        try {

            setLoading(true);


            const token =
                localStorage.getItem("token");


            const response =
                await axios.get(
                    "/user/presensi/saya",
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`,
                        },
                    }
                );


            const data =
                response.data.data || [];


            // ========================================
            // KELOMPOKKAN BERDASARKAN TANGGAL
            // ========================================

            const grouped = {};


            data.forEach((item) => {

                const date =
                    new Date(
                        item.created_at
                    );


                const tanggal =
                    `${date.getFullYear()}-${String(
                        date.getMonth() + 1
                    ).padStart(2, "0")}-${String(
                        date.getDate()
                    ).padStart(2, "0")}`;


                if (!grouped[tanggal]) {

                    grouped[tanggal] = {
                        datang: null,
                        pulang: null,
                    };

                }


                if (
                    item.jenis === "datang"
                ) {

                    grouped[tanggal].datang =
                        item;

                }


                if (
                    item.jenis === "pulang"
                ) {

                    grouped[tanggal].pulang =
                        item;

                }

            });


            // ========================================
            // HITUNG STATISTIK
            // ========================================

            let hadir = 0;

            let hadirToday = 0;

            let sakit = 0;

            let izin = 0;

            let tidakHadir = 0;


            Object.entries(grouped).forEach(
                ([tanggal, item]) => {

                    let status =
                        "tidak hadir";


                    if (
                        item.datang?.status ===
                        "hadir"
                    ) {

                        status = "hadir";

                    } else if (
                        item.datang?.status ===
                        "izin"
                    ) {

                        status = "izin";

                    } else if (
                        item.datang?.status ===
                        "sakit"
                    ) {

                        status = "sakit";

                    }


                    // ================================
                    // TOTAL HADIR
                    // ================================

                    if (
                        status === "hadir"
                    ) {

                        hadir++;

                    }


                    // ================================
                    // HADIR HARI INI
                    // ================================

                    if (
                        tanggal ===
                        tanggalHariIni &&
                        status === "hadir"
                    ) {

                        hadirToday++;

                    }


                    // ================================
                    // SAKIT
                    // ================================

                    if (
                        status === "sakit"
                    ) {

                        sakit++;

                    }


                    // ================================
                    // IZIN
                    // ================================

                    if (
                        status === "izin"
                    ) {

                        izin++;

                    }


                    // ================================
                    // TIDAK HADIR
                    // ================================

                    if (
                        status === "tidak hadir"
                    ) {

                        tidakHadir++;

                    }

                }
            );


            setTotalHadir(hadir);

            setHadirHariIni(hadirToday);

            setTotalSakit(sakit);

            setTotalIzin(izin);

            setTotalTidakHadir(
                tidakHadir
            );


        } catch (error) {

            console.error(
                "GET PRESENSI DASHBOARD ERROR:",
                error
            );

        } finally {

            setLoading(false);

        }

    };


    // ========================================
    // LOAD DATA
    // ========================================

    useEffect(() => {

        fetchPresensi();

    }, []);


    // ========================================
    // STATISTIK CARD
    // ========================================

    const statistics = [

        {
            title: "Total Hadir",
            value: totalHadir,
            icon: "bi-person-check-fill",
            iconColor: "#198754",
            backgroundColor: "#e8f5e9",
        },

        {
            title: "Hadir Hari Ini",
            value: hadirHariIni,
            icon: "bi-calendar-check-fill",
            iconColor: "#015E78",
            backgroundColor: "#e3f2fd",
        },

        {
            title: "Sakit",
            value: totalSakit,
            icon: "bi-heart-pulse-fill",
            iconColor: "#d6a500",
            backgroundColor: "#fff8e1",
        },

        {
            title: "Izin",
            value: totalIzin,
            icon: "bi-envelope-paper-fill",
            iconColor: "#0d6efd",
            backgroundColor: "#e7f1ff",
        },

        {
            title: "Tidak Hadir",
            value: totalTidakHadir,
            icon: "bi-person-x-fill",
            iconColor: "#dc3545",
            backgroundColor: "#ffebee",
        },

    ];


    return (

        <div className="container py-4">

            {/* ========================================
                HEADER
            ======================================== */}

            <div className="mb-2">
                <h2 className="fw-bold text-wrap">
                Hi, <span className="fw-semibold">{user?.name || "-"}</span>
            </h2>   
                

                <p className="text-muted mb-0">
                    Selamat datang di aplikasi presensi
                    magang Puskesmas Mandiraja 2.
                </p>

            </div>


            {/* ========================================
                INFORMASI PENGGUNA
            ======================================== */}

            <div className="card shadow-sm mb-4">

                <div className="card-body">

                    <h5 className="card-title mb-3">
                        Informasi Pengguna
                    </h5>

                    <div className="row">

                        <div className="col-md-4 mb-3">

                            <small className="text-muted">
                                Nama
                            </small>

                            <div className="fw-semibold">
                                {user?.name || "-"}
                            </div>

                        </div>


                        <div className="col-md-4 mb-3">

                            <small className="text-muted">
                                Email
                            </small>

                            <div className="fw-semibold">
                                {user?.email || "-"}
                            </div>

                        </div>


                        <div className="col-md-4 mb-3">

                            <small className="text-muted">
                                Posisi
                            </small>

                            <div className="fw-semibold">
                                {user?.position || "-"}
                            </div>

                        </div>

                    </div>

                </div>

            </div>


            {/* ========================================
                STATISTIK PRESENSI
            ======================================== */}

            <div className="row g-3 mb-4">

                {statistics.map((item) => (

                    <div
                        className="col-12 col-sm-6 col-lg"
                        key={item.title}
                    >

                        <div
                            className="card shadow-sm h-100"
                        >

                            <div className="card-body">

                                <div className="d-flex justify-content-between align-items-center">

                                    {/* TEXT */}

                                    <div>

                                        <h6 className="text-muted mb-2">
                                            {item.title}
                                        </h6>


                                        {loading ? (

                                            <div
                                                className="spinner-border spinner-border-sm"
                                                role="status"
                                            />

                                        ) : (

                                            <h2 className="mb-0 fw-bold">
                                                {item.value}
                                            </h2>

                                        )}

                                    </div>


                                    {/* ICON */}

                                    <div
                                        className="rounded-circle d-flex justify-content-center align-items-center"
                                        style={{
                                            width: "50px",
                                            height: "50px",
                                            backgroundColor:
                                                item.backgroundColor,
                                        }}
                                    >

                                        <i
                                            className={`bi ${item.icon}`}
                                            style={{
                                                fontSize: "23px",
                                                color:
                                                    item.iconColor,
                                            }}
                                        />

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ========================================
                MENU
            ======================================== */}

            <div className="row g-3">
                {/* PRESENSI */}
                {/* <div className="col-12 col-md-4">
                    <div className="card shadow-sm h-100">
                        <div className="card-body">
                            <div className="mb-3">
                                <i
                                    className="bi bi-calendar-check"
                                    style={{
                                        fontSize: "35px",
                                    }}
                                />
                            </div>
                            <h5>
                                Presensi
                            </h5>
                            <p className="text-muted">
                                Fitur presensi akan dibuat
                                di sini.
                            </p>
                            <button
                                className="btn btn-primary"
                                disabled
                            >
                                Presensi
                            </button>
                        </div>
                    </div>
                </div> */}


                {/* RIWAYAT */}

                {/* <div className="col-12 col-md-4">
                    <div className="card shadow-sm h-100">
                        <div className="card-body">
                            <div className="mb-3">
                                <i
                                    className="bi bi-clock-history"
                                    style={{
                                        fontSize: "35px",
                                    }}
                                />
                            </div>
                            <h5>
                                Riwayat Presensi
                            </h5>
                            <p className="text-muted">
                                Riwayat presensi akan
                                ditampilkan di sini.
                            </p>
                            <button
                                className="btn btn-secondary"
                                disabled
                            >
                                Lihat Riwayat
                            </button>
                        </div>
                    </div>
                </div> */}


                {/* PROFIL */}

                {/* <div className="col-12 col-md-4">
                    <div className="card shadow-sm h-100">
                        <div className="card-body">
                            <div className="mb-3">
                                <i
                                    className="bi bi-person-circle"
                                    style={{
                                        fontSize: "35px",
                                    }}
                                />
                            </div>
                            <h5>
                                Profil
                            </h5>

                            <p className="text-muted">
                                Informasi akun pengguna.
                            </p>
                            <button
                                className="btn btn-outline-primary"
                                disabled
                            >
                                Profil
                            </button>
                        </div>
                    </div>
                </div> */}
            </div>

            {/* ========================================
                INFO
            ======================================== */}

            <div className="alert alert-info mt-4">
                <i className="bi bi-info-circle me-2"></i>
                Dashboard sementara. Fitur presensi akan
                ditambahkan secara bertahap.
            </div>
        </div>
    );
};

export default UserDashboard;