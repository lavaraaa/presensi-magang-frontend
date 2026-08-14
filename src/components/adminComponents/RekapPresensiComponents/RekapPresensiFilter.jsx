import React from "react";

const RekapPresensiFilter = ({
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

    search,
    setSearch,

    tanggalHariIni,

    status,
    setStatus,
}) => {

    return (

        <div className="card shadow-sm mb-3">

            <div className="card-body">

                {/* ========================================
                    PENCARIAN PESERTA
                ======================================== */}

                <div className="row g-3 mb-3">

                    <div className="col-12 col-md-4">

                        <label className="form-label fw-semibold">
                            Cari Peserta
                        </label>

                        <div className="input-group">
                            {/* <span className="input-group-text">
                                <i className="bi bi-search"></i>
                            </span> */}

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Cari berdasarkan nama atau email..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                            />

                        </div>

                    </div>


                    {/* ========================================
                        JENIS FILTER
                    ======================================== */}

                    <div className="col-12 col-md-4">

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
                                Semua Data
                            </option>

                            <option value="tanggal">
                                Tanggal Tertentu
                            </option>

                            <option value="rentang">
                                Rentang Tanggal
                            </option>

                            <option value="bulan">
                                Periode
                            </option>

                        </select>

                    </div>


                    {/* ========================================
                        STATUS
                    ======================================== */}

                    <div className="col-12 col-md-4">

                        <label className="form-label fw-semibold">
                            Status
                        </label>

                        <select
                            className="form-select"
                            value={status}
                            onChange={(e) =>
                                setStatus(e.target.value)
                            }
                        >

                            <option value="semua">
                                Semua Status
                            </option>

                            <option value="hadir">
                                Hadir
                            </option>

                            <option value="izin">
                                Izin
                            </option>

                            <option value="sakit">
                                Sakit
                            </option>

                        </select>

                    </div>

                </div>


                {/* ========================================
                    TANGGAL TERTENTU
                ======================================== */}

                {filterType === "tanggal" && (

                    <div>

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
                    RENTANG TANGGAL
                ======================================== */}

                {filterType === "rentang" && (

                    <div className="row g-3">

                        <div className="col-12 col-md-6">

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


                        <div className="col-12 col-md-6">

                            <label className="form-label fw-semibold">
                                Sampai Tanggal
                            </label>

                            <input
                                type="date"
                                className="form-control"
                                value={tanggalAkhir}
                                min={tanggalMulai || undefined}
                                max={tanggalHariIni}
                                onChange={(e) =>
                                    setTanggalAkhir(
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                    </div>

                )}


                {/* ========================================
                    PERIODE
                ======================================== */}

                {filterType === "bulan" && (

                    <div>

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

                            <option value="2026-08-10|2026-09-09">
                                10 Agustus 2026 - 9 September 2026
                            </option>

                            <option value="2026-09-10|2026-10-09">
                                10 September 2026 - 9 Oktober 2026
                            </option>

                            <option value="2026-10-10|2026-11-09">
                                10 Oktober 2026 - 9 November 2026
                            </option>

                            <option value="2026-11-10|2026-12-09">
                                10 November 2026 - 9 Desember 2026
                            </option>

                            <option value="2026-12-10|2027-01-09">
                                10 Desember 2026 - 9 Januari 2027
                            </option>

                            <option value="2027-01-10|2027-02-09">
                                10 Januari 2027 - 9 Februari 2027
                            </option>

                        </select>

                    </div>

                )}

            </div>

        </div>

    );

};

export default RekapPresensiFilter;