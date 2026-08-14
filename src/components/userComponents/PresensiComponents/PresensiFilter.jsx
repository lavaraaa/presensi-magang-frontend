import React from "react";

const PresensiFilter = ({
    filterType,
    setFilterType,

    tanggal,
    setTanggal,

    tanggalMulai,
    setTanggalMulai,

    tanggalAkhir,
    setTanggalAkhir,

    periode,
    setPeriode,

    tanggalHariIni,
}) => {


    // ========================================
    // PERIODE YANG TERSEDIA
    // ========================================

    const periodeList = [

        {
            label:
                "10 Agustus 2026 - 9 September 2026",
            start:
                "2026-08-10",
            end:
                "2026-09-09",
        },

        {
            label:
                "10 September 2026 - 9 Oktober 2026",
            start:
                "2026-09-10",
            end:
                "2026-10-09",
        },

        {
            label:
                "10 Oktober 2026 - 9 November 2026",
            start:
                "2026-10-10",
            end:
                "2026-11-09",
        },

        {
            label:
                "10 November 2026 - 9 Desember 2026",
            start:
                "2026-11-10",
            end:
                "2026-12-09",
        },

        {
            label:
                "10 Desember 2026 - 9 Januari 2027",
            start:
                "2026-12-10",
            end:
                "2027-01-09",
        },

        {
            label:
                "10 Januari 2027 - 9 Februari 2027",
            start:
                "2027-01-10",
            end:
                "2027-02-09",
        },

    ];


    return (

        <div className="card shadow-sm mb-4">

            <div className="card-body">

                <div className="row g-3">


                    {/* ========================================
                        JENIS FILTER
                    ======================================== */}

                    <div className="col-12 col-md-3">

                        <label className="form-label fw-semibold">

                            Filter Berdasarkan

                        </label>


                        <select
                            className="form-select"
                            value={filterType}
                            onChange={(e) => {

                                setFilterType(
                                    e.target.value
                                );

                                setTanggal("");

                                setTanggalMulai("");

                                setTanggalAkhir("");

                                setPeriode("");

                            }}
                        >

                            <option value="semua">
                                Semua
                            </option>

                            <option value="tanggal">
                                Tanggal
                            </option>

                            <option value="rentang">
                                Rentang Hari
                            </option>

                            <option value="bulan">
                                Periode Bulanan
                            </option>

                        </select>

                    </div>


                    {/* ========================================
                        TANGGAL
                    ======================================== */}

                    {filterType === "tanggal" && (

                        <div className="col-12 col-md-3">

                            <label className="form-label fw-semibold">

                                Pilih Tanggal

                            </label>

                            <input
                                type="date"
                                className="form-control"
                                value={tanggal}
                                max={tanggalHariIni}
                                onChange={(e) =>
                                    setTanggal(
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                    )}


                    {/* ========================================
                        RENTANG
                    ======================================== */}

                    {filterType === "rentang" && (

                        <>

                            <div className="col-12 col-md-3">

                                <label className="form-label fw-semibold">

                                    Dari Tanggal

                                </label>

                                <input
                                    type="date"
                                    className="form-control"
                                    value={tanggalMulai}
                                    max={
                                        tanggalAkhir ||
                                        tanggalHariIni
                                    }
                                    onChange={(e) =>
                                        setTanggalMulai(
                                            e.target.value
                                        )
                                    }
                                />

                            </div>


                            <div className="col-12 col-md-3">

                                <label className="form-label fw-semibold">

                                    Sampai Tanggal

                                </label>

                                <input
                                    type="date"
                                    className="form-control"
                                    value={tanggalAkhir}
                                    min={
                                        tanggalMulai ||
                                        undefined
                                    }
                                    max={tanggalHariIni}
                                    onChange={(e) =>
                                        setTanggalAkhir(
                                            e.target.value
                                        )
                                    }
                                />

                            </div>

                        </>

                    )}


                    {/* ========================================
                        BULAN / PERIODE
                    ======================================== */}

                    {filterType === "bulan" && (

                        <div className="col-12 col-md-6">

                            <label className="form-label fw-semibold">

                                Pilih Periode

                            </label>


                            <select
                                className="form-select"
                                value={periode}
                                onChange={(e) =>
                                    setPeriode(
                                        e.target.value
                                    )
                                }
                            >

                                <option value="">
                                    Pilih periode
                                </option>


                                {periodeList.map(
                                    (item) => (

                                        <option
                                            key={
                                                item.start
                                            }
                                            value={
                                                `${item.start}|${item.end}`
                                            }
                                        >

                                            {item.label}

                                        </option>

                                    )
                                )}

                            </select>

                        </div>

                    )}

                </div>

            </div>

        </div>

    );

};


export default PresensiFilter;