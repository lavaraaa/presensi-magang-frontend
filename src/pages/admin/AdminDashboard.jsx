import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
    const [totalPeserta, setTotalPeserta] = useState(0);
    const [totalHadir, setTotalHadir] = useState(0);
    const [totalSakit, setTotalSakit] = useState(0);
    const [totalIzin, setTotalIzin] = useState(0);
    const [totalTidakHadir, setTotalTidakHadir] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const fetchDashboard = async () => {
        try {
            setLoading(true);
            setError("");
            const token =
                localStorage.getItem("token");
            const response = await axios.get(
                "/admin/dashboard",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );

            console.log(
                "DATA DASHBOARD:",
                response.data
            );


            const data =
                response.data.data || {};
            setTotalPeserta(
                data.totalPeserta || 0
            );
            setTotalHadir(
                data.totalHadir || 0
            );
            setTotalSakit(
                data.totalSakit || 0
            );
            setTotalIzin(
                data.totalIzin || 0
            );
            setTotalTidakHadir(
                data.totalTidakHadir || 0
            );

        } catch (error) {
            console.error(
                "GET DASHBOARD ERROR:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Gagal mengambil data dashboard"
            );
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchDashboard();
    }, []);

    const statistics = [
        {
            title: "Total Peserta",
            value: totalPeserta,
            icon: "bi-people-fill",
            iconColor: "#015E78",
            backgroundColor: "#e3f2fd",
        },

        {
            title: "Hadir Hari Ini",
            value: totalHadir,
            icon: "bi-person-check-fill",
            iconColor: "#198754",
            backgroundColor: "#e8f5e9",
        },

        {
            title: "Sakit",
            value: totalSakit,
            icon: "bi-heart-pulse-fill",
            iconColor: "#dc3545",
            backgroundColor: "#ffebee",
        },

        {
            title: "Izin",
            value: totalIzin,
            icon: "bi-envelope-paper-fill",
            iconColor: "#fd7e14",
            backgroundColor: "#fff3e0",
        },

    ];

    return (

        <div
            style={{
                minHeight: "100vh",
                backgroundColor: "#f5f6f8",
            }}
        >
            <main className="container-fluid p-4">
                <h2 className="mb-1">
                    Dashboard Admin
                </h2>
                <p className="text-muted">
                    Selamat datang di sistem presensi
                    anak magang Puskesmas 2 Mandiraja
                </p>
                {error && (
                    <div className="alert alert-danger">
                        {error}
                    </div>
                )}

                <div className="row g-3 mt-2">
                    {statistics.map((item) => (
                        <div
                            className="col-12 col-sm-6 col-lg"
                            key={item.title}
                        >
                            <div
                                className="card shadow-sm h-100"
                            >
                                <div className="card-body">
                                    <div
                                        className="
                                            d-flex
                                            justify-content-between
                                            align-items-center
                                        "
                                    >

                                        {/* TEXT */}

                                        <div>
                                            <h6
                                                className="text-muted mb-2"
                                            >
                                                {item.title}
                                            </h6>
                                            {loading ? (
                                                <div
                                                    className="
                                                        spinner-border
                                                        spinner-border-sm
                                                    "
                                                    role="status"
                                                />
                                            ) : (
                                                <h2
                                                    className="
                                                        mb-0
                                                        fw-bold
                                                    "
                                                >
                                                    {item.value}
                                                </h2>
                                            )}
                                        </div>
                                        {/* ICON */}
                                        <div
                                            className="
                                                rounded-circle
                                                d-flex
                                                justify-content-center
                                                align-items-center
                                            "
                                            style={{
                                                width: "50px",
                                                height: "50px",
                                                backgroundColor:
                                                    item.backgroundColor,
                                            }}
                                        >
                                            <i
                                                className={
                                                    `bi ${item.icon}`
                                                }
                                                style={{
                                                    fontSize:
                                                        "23px",
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

                <div className="card shadow-sm mt-4">
                    <div className="card-body">
                        <h5>
                            Informasi Presensi Hari Ini
                        </h5>
                        <p className="text-muted mb-0">
                            Data statistik presensi
                            peserta diperbarui berdasarkan
                            data presensi hari ini.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );

};


export default AdminDashboard;