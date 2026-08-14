import React, {useEffect, useState} from "react";
import axios from "axios";
import RekapPresensiFilter from "../../components/adminComponents/RekapPresensiComponents/RekapPresensiFilter";
import RekapPresensiTable from "../../components/adminComponents/RekapPresensiComponents/RekapPresensiTable";
import RekapPresensiExport from "../../components/adminComponents/RekapPresensiComponents/RekapPresensiExport";

const RekapPresensi = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [filterType, setFilterType] = useState("semua");
    const [tanggal, setTanggal] = useState("");
    const [tanggalMulai, setTanggalMulai] = useState("");
    const [tanggalAkhir, setTanggalAkhir] = useState("");

    const [periode, setPeriode] = useState("");

    const [search, setSearch] = useState("");

    const [status, setStatus] = useState("semua");


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
    // AMBIL DATA
    // ========================================

    const fetchRekap = async () => {

        try {

            setLoading(true);

            setError("");


            const token =
                localStorage.getItem("token");


            const response =
                await axios.get(
                    "/admin/rekap-presensi",
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`,
                        },
                    }
                );


            setData(
                response.data.data || []
            );


        } catch (error) {

            console.error(
                "GET REKAP PRESENSI ERROR:",
                error
            );


            setError(
                error.response?.data?.message ||
                "Gagal mengambil data rekap presensi."
            );


        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        fetchRekap();

    }, []);


    // ========================================
    // GROUP DATA
    // ========================================

    const groupDataByDate = () => {

        const grouped = {};


        data.forEach((item) => {

            const date =
                new Date(item.created_at);


            const tanggal =
                `${date.getFullYear()}-${String(
                    date.getMonth() + 1
                ).padStart(2, "0")}-${String(
                    date.getDate()
                ).padStart(2, "0")}`;


            const key =
                `${item.user_id}_${tanggal}`;


            if (!grouped[key]) {

                grouped[key] = [];

            }


            grouped[key].push(item);

        });


        return grouped;

    };


    // ========================================
    // FILTER
    // ========================================

    const getFilteredData = () => {

        const grouped =
            groupDataByDate();


        let filteredKeys =
            Object.keys(grouped);


        // ========================================
        // NAMA / EMAIL
        // ========================================

        if (search.trim()) {

            const keyword =
                search.toLowerCase().trim();


            filteredKeys =
                filteredKeys.filter((key) => {

                    const item =
                        grouped[key][0];


                    return (

                        item.nama
                            ?.toLowerCase()
                            .includes(keyword)

                        ||

                        item.email
                            ?.toLowerCase()
                            .includes(keyword)

                    );

                });

        }


        // ========================================
        // STATUS
        // ========================================

        if (status !== "semua") {

            filteredKeys =
                filteredKeys.filter((key) => {

                    return grouped[key].some((item) => {

                        return (
                            item.status
                                ?.toLowerCase() ===
                            status.toLowerCase()
                        );

                    });

                });

        }


        // ========================================
        // TANGGAL
        // ========================================

        if (
            filterType === "tanggal" &&
            tanggal
        ) {

            filteredKeys =
                filteredKeys.filter((key) => {

                    const item =
                        grouped[key][0];

                    const date =
                        new Date(
                            item.created_at
                        );

                    const keyTanggal =
                        `${date.getFullYear()}-${String(
                            date.getMonth() + 1
                        ).padStart(2, "0")}-${String(
                            date.getDate()
                        ).padStart(2, "0")}`;

                    return keyTanggal === tanggal;

                });

        }


        // ========================================
        // RENTANG
        // ========================================

        if (
            filterType === "rentang" &&
            tanggalMulai &&
            tanggalAkhir
        ) {

            filteredKeys =
                filteredKeys.filter((key) => {

                    const item =
                        grouped[key][0];

                    const date =
                        new Date(
                            item.created_at
                        );

                    const keyTanggal =
                        `${date.getFullYear()}-${String(
                            date.getMonth() + 1
                        ).padStart(2, "0")}-${String(
                            date.getDate()
                        ).padStart(2, "0")}`;

                    return (
                        keyTanggal >= tanggalMulai &&
                        keyTanggal <= tanggalAkhir
                    );

                });

        }


        // ========================================
        // PERIODE
        // ========================================

        if (
            filterType === "bulan" &&
            periode
        ) {

            const [
                start,
                end,
            ] = periode.split("|");


            filteredKeys =
                filteredKeys.filter((key) => {

                    const item =
                        grouped[key][0];

                    const date =
                        new Date(
                            item.created_at
                        );

                    const keyTanggal =
                        `${date.getFullYear()}-${String(
                            date.getMonth() + 1
                        ).padStart(2, "0")}-${String(
                            date.getDate()
                        ).padStart(2, "0")}`;

                    return (
                        keyTanggal >= start &&
                        keyTanggal <= end
                    );

                });

        }


        // ========================================
        // KEMBALIKAN DATA
        // ========================================

        const result = [];


        filteredKeys.forEach((key) => {

            grouped[key].forEach((item) => {

                result.push(item);

            });

        });


        return result;

    };


    const filteredData =
        getFilteredData();


    return (

        <div
            style={{
                minHeight: "100vh",
                backgroundColor: "#f5f6f8",
            }}
        >

            <main className="container-fluid p-4">


                {/* ========================================
                    HEADER
                ======================================== */}

                <div className="mb-4">

                    <h3 className="mb-1">
                        Rekap Presensi
                    </h3>

                    <p className="text-muted mb-0">
                        Kelola dan lihat seluruh data presensi peserta magang.
                    </p>

                </div>


                {/* ========================================
                    ERROR
                ======================================== */}

                {error && (

                    <div className="alert alert-danger">

                        {error}

                    </div>

                )}


                {/* ========================================
                    FILTER
                ======================================== */}

                <RekapPresensiFilter

                    filterType={filterType}
                    setFilterType={setFilterType}

                    tanggal={tanggal}
                    setTanggal={setTanggal}

                    tanggalMulai={tanggalMulai}
                    setTanggalMulai={setTanggalMulai}

                    tanggalAkhir={tanggalAkhir}
                    setTanggalAkhir={setTanggalAkhir}

                    periode={periode}
                    setPeriode={setPeriode}

                    search={search}
                    setSearch={setSearch}

                    status={status}
                    setStatus={setStatus}

                    tanggalHariIni={
                        tanggalHariIni
                    }

                />
                <RekapPresensiExport
    data={filteredData}
/>


                {/* ========================================
                    TABLE
                ======================================== */}

                <div className="card shadow-sm">

                    <div className="card-body p-0">

                        {loading ? (

                            <div className="text-center py-5">

                                <div
                                    className="spinner-border"
                                    role="status"
                                />

                                <p className="text-muted mt-2 mb-0">
                                    Memuat data presensi...
                                </p>

                            </div>

                        ) : filteredData.length === 0 ? (

                            <div className="text-center py-5 px-3">

                                <i
                                    className="bi bi-calendar-x text-muted"
                                    style={{
                                        fontSize: "45px",
                                    }}
                                />

                                <h5 className="mt-3">
                                    Belum Ada Data Presensi
                                </h5>

                                <p className="text-muted mb-0">
                                    Tidak ada data presensi pada filter yang dipilih.
                                </p>

                            </div>

                        ) : (

                            <RekapPresensiTable
                                data={filteredData}
                            />

                        )}

                    </div>

                </div>


            </main>

        </div>

    );

};


export default RekapPresensi;
