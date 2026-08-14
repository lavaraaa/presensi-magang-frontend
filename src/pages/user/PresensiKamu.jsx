import React, {useEffect, useState} from "react";
import axios from "axios";
import PresensiFilter from "../../components/userComponents/PresensiComponents/PresensiFilter";
import PresensiTable from "../../components/userComponents/PresensiComponents/PresensiTable";
import PresensiExport from "../../components/userComponents/PresensiComponents/PresensiExport";

const PresensiKamu = () => {

    const [data, setData] = useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    // ========================================
    // FILTER
    // ========================================

    const [filterType, setFilterType] =
        useState("semua");

    const [tanggal, setTanggal] =
        useState("");

    const [tanggalMulai, setTanggalMulai] =
        useState("");

    const [tanggalAkhir, setTanggalAkhir] =
        useState("");

    const [periode, setPeriode] =
        useState("");


    // ========================================
    // TANGGAL HARI INI
    // ========================================

    const today =
        new Date();

    const tanggalHariIni =
        `${today.getFullYear()}-${String(
            today.getMonth() + 1
        ).padStart(2, "0")}-${String(
            today.getDate()
        ).padStart(2, "0")}`;


    // ========================================
    // AMBIL DATA
    // ========================================

    const fetchPresensi = async () => {

        try {

            setLoading(true);

            setError("");


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


            setData(
                response.data.data || []
            );


        } catch (error) {

            console.error(
                "GET PRESENSI SAYA ERROR:",
                error
            );


            setError(
                error.response?.data?.message ||
                "Gagal mengambil data presensi."
            );


        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        fetchPresensi();

    }, []);


    // ========================================
    // GROUP DATA BERDASARKAN HARI
    // ========================================

    const groupDataByDate = () => {

        const grouped = {};


        data.forEach((item) => {

            const date =
                new Date(item.created_at);


            const key =
                `${date.getFullYear()}-${String(
                    date.getMonth() + 1
                ).padStart(2, "0")}-${String(
                    date.getDate()
                ).padStart(2, "0")}`;


            if (!grouped[key]) {

                grouped[key] = [];

            }


            grouped[key].push(item);

        });


        return grouped;

    };


    // ========================================
    // FILTER DATA
    // ========================================

    const getFilteredData = () => {

        const grouped =
            groupDataByDate();


        let filteredKeys =
            Object.keys(grouped);


        // ========================================
        // TANGGAL
        // ========================================

        if (
            filterType === "tanggal" &&
            tanggal
        ) {

            filteredKeys =
                filteredKeys.filter(
                    (key) =>
                        key === tanggal
                );

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
                filteredKeys.filter(
                    (key) =>
                        key >= tanggalMulai &&
                        key <= tanggalAkhir
                );

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
            ] =
                periode.split("|");


            filteredKeys =
                filteredKeys.filter(
                    (key) =>
                        key >= start &&
                        key <= end
                );

        }


        // ========================================
        // DATA AKHIR
        // ========================================

        const result = [];


        filteredKeys.forEach(
            (key) => {

                grouped[key].forEach(
                    (item) => {

                        result.push(item);

                    }
                );

            }
        );


        return result;

    };


    const filteredData =
        getFilteredData();


    // ========================================
    // RENDER
    // ========================================

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

                        Presensi Kamu

                    </h3>


                    <p className="text-muted mb-0">

                        Lihat riwayat presensi kamu.

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

                <PresensiFilter

                    filterType={filterType}

                    setFilterType={setFilterType}

                    tanggal={tanggal}

                    setTanggal={setTanggal}

                    tanggalMulai={tanggalMulai}

                    setTanggalMulai={
                        setTanggalMulai
                    }

                    tanggalAkhir={tanggalAkhir}

                    setTanggalAkhir={
                        setTanggalAkhir
                    }

                    periode={periode}

                    setPeriode={setPeriode}

                    tanggalHariIni={
                        tanggalHariIni
                    }

                />
<PresensiExport
    data={filteredData}
/>
<div className="card shadow-sm"></div>

                {/* ========================================
                    TABLE
                ======================================== */}

                <div className="card shadow-sm">

                    <div className="card-body p-0">


                        {loading ? (

                            <div
                                className="
                                    text-center
                                    py-5
                                "
                            >

                                <div
                                    className="
                                        spinner-border
                                    "
                                />

                                <p
                                    className="
                                        text-muted
                                        mt-2
                                        mb-0
                                    "
                                >

                                    Memuat data
                                    presensi...

                                </p>

                            </div>

                        ) : filteredData.length === 0 ? (

                            <div
                                className="
                                    text-center
                                    py-5
                                    px-3
                                "
                            >

                                <i
                                    className="
                                        bi
                                        bi-calendar-x
                                        text-muted
                                    "
                                    style={{
                                        fontSize:
                                            "45px",
                                    }}
                                />


                                <h5 className="mt-3">

                                    Belum Ada Data Presensi

                                </h5>


                                <p
                                    className="
                                        text-muted
                                        mb-0
                                    "
                                >

                                    Tidak ada data presensi
                                    pada periode yang dipilih.

                                </p>

                            </div>

                        ) : (

                            <PresensiTable
                                data={filteredData}
                            />

                        )}

                    </div>

                </div>

            </main>

        </div>

    );

};


export default PresensiKamu;