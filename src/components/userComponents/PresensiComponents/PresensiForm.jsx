import React, { useEffect, useState } from "react";
import axios from "axios";

const PresensiForm = () => {
    const [jenis, setJenis] = useState("datang");
    const [status, setStatus] = useState("");
    const [keterangan, setKeterangan] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [presensiHariIni, setPresensiHariIni] = useState({
        datang: false,
        pulang: false,
    });

    const tanggalHariIni = new Date();
    const tanggalText =
        tanggalHariIni.toLocaleDateString(
            "id-ID",
            {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
            }
        );

       const fetchPresensiHariIni = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const response = await axios.get(
                "/user/presensi/hari-ini",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );

            setPresensiHariIni(
                response.data.data || {
                    datang: false,
                    pulang: false,
                }
            );

        } catch (error) {

            console.error(
                "GET PRESENSI HARI INI ERROR:",
                error
            );
        }
    };

    useEffect(() => {
        fetchPresensiHariIni();
    }, []);

    useEffect(() => {
        if (presensiHariIni.pulang) {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });

        }

    }, [presensiHariIni.pulang]);

    const handleJenisChange = (jenisBaru) => {
        setJenis(jenisBaru);
        setStatus("");
        setKeterangan("");
        setError("");
        setSuccess("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!status) {
            setError(
                "Silakan pilih status presensi."
            );
            return;
        }

        if (
            (status === "izin" ||
                status === "sakit") &&
            !keterangan.trim()
        ) {

            setError(
                "Keterangan wajib diisi untuk izin atau sakit."
            );
            return;
        }

        if (
            jenis === "datang" &&
            presensiHariIni.datang
        ) {
            setError(
                "Anda sudah melakukan presensi datang hari ini."
            );
            return;
        }
        if (
            jenis === "pulang" &&
            !presensiHariIni.datang
        ) {
            setError(
                "Anda belum melakukan presensi datang hari ini."
            );
            return;
        }

        if (
            jenis === "pulang" &&
            presensiHariIni.pulang
        ) {
            setError(
                "Anda sudah melakukan presensi pulang hari ini."
            );
            return;
        }

        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const response = await axios.post( `/user/presensi/${jenis}`,
                {
                    status,
                    keterangan:
                        status === "hadir" ? null : keterangan,
                    lokasi:
                        "Puskesmas Mandiraja 2",
                },
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );

            setSuccess(
                response.data.message || "Presensi berhasil."
            );
            setStatus("");
            setKeterangan("");
            await fetchPresensiHariIni();

        } catch (error) {

            console.error(
                "PRESENSI ERROR:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Gagal melakukan presensi."
            );

        } finally {
            setLoading(false);
        }
    };

    const sudahPresensiPulang =
        presensiHariIni.pulang;

    return (

        <div className="card shadow-sm">
            <div className="card-body p-2">
                <h5 className="mb-1"> Presensi </h5>
                <p className="text-muted mb-2">
                    Silakan lakukan presensi Anda hari ini.
                </p>

                {sudahPresensiPulang ? (
                    <div className="text-center py-3">

                        <div className="rounded-circle bg-success bg-opacity-10 d-flex align-items-center justify-content-center mx-auto mb-3"
                            style={{
                                width: "50px", height: "50px",
                            }}>

                            <i className=" bi bi-check-circle-fill text-success "
                                style={{ fontSize: "42px", }} />
                        </div>

                        <h5 className="text-success">
                            Anda sudah presensi hari ini
                        </h5>

                        <p className="text-muted mb-0">
                            Presensi datang dan pulang
                            Anda untuk hari ini sudah
                            tercatat.
                        </p>
                    </div>
                ) : (
                    <>
                        {/* ========================================
                            JENIS PRESENSI
                        ======================================== */}

                        <div className="mb-4">

                            <label className="form-label fw-semibold">
                                Jenis Presensi
                            </label>


                            <div className="d-flex gap-2">

                            <button
    type="button"
    className={
        jenis === "datang"
            ? "btn btn-primary"
            : "btn btn-outline-primary"
    }
    style={
        presensiHariIni.datang || loading
            ? {
                  backgroundColor: "#e9ecef",
                  color: "#6c757d",
                  borderColor: "#dee2e6",
                  opacity: 0.7,
                  cursor: "not-allowed",
              }
            : jenis === "datang"
            ? undefined
            : {
                  backgroundColor: "#fff",
                  color: "#0d6efd",
                  borderColor: "#0d6efd",
              }
    }
    onClick={() => handleJenisChange("datang")}
    disabled={presensiHariIni.datang || loading}
>
    <i className="bi bi-box-arrow-in-right me-2"></i>
    Presensi Datang
</button>

<button
    type="button"
    className={
        jenis === "pulang"
            ? "btn btn-primary"
            : "btn btn-outline-primary"
    }
    style={
        !presensiHariIni.datang ||
        presensiHariIni.pulang ||
        loading
            ? {
                  backgroundColor: "#e9ecef",
                  color: "#6c757d",
                  borderColor: "#dee2e6",
                  opacity: 0.7,
                  cursor: "not-allowed",
              }
            : jenis === "pulang"
            ? undefined
            : {
                  backgroundColor: "#fff",
                  color: "#0d6efd",
                  borderColor: "#0d6efd",
              }
    }
    onClick={() => handleJenisChange("pulang")}
    disabled={
        !presensiHariIni.datang ||
        presensiHariIni.pulang ||
        loading
    }
>
    <i className="bi bi-box-arrow-right me-2"></i>
    Presensi Pulang
</button>

                            </div>

                        </div>


                        {/* ========================================
                            TANGGAL
                        ======================================== */}

                        <div className="mb-3">

                            <label className="form-label fw-semibold">
                                Tanggal
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                value={tanggalText}
                                readOnly
                            />

                        </div>


                        {/* ========================================
                            STATUS
                        ======================================== */}

                        <div className="mb-3">

                            <label className="form-label fw-semibold">
                                Status Presensi
                            </label>

                            <select
                                className="form-select"
                                value={status}
                                onChange={(e) =>
                                    setStatus(
                                        e.target.value
                                    )
                                }
                                disabled={loading}
                            >

                                <option value="">
                                    Pilih status
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


                        {/* ========================================
                            KETERANGAN
                        ======================================== */}

                        {(status === "izin" ||
                            status === "sakit") && (

                            <div className="mb-3">

                                <label className="form-label fw-semibold">
                                    Keterangan
                                </label>

                                <textarea
                                    className="form-control"
                                    rows="3"
                                    value={keterangan}
                                    onChange={(e) =>
                                        setKeterangan(
                                            e.target.value
                                        )
                                    }
                                    placeholder={
                                        status === "izin"
                                            ? "Masukkan alasan izin"
                                            : "Masukkan keterangan sakit"
                                    }
                                    disabled={loading}
                                />

                            </div>

                        )}


                        {/* ========================================
                            LOKASI
                        ======================================== */}

                        <div className="mb-4">

                            <label className="form-label fw-semibold">
                                Lokasi
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                value="Puskesmas Mandiraja 2"
                                readOnly
                            />

                        </div>


                        <div className="alert alert-info mt-4">

                            <i className="bi bi-info-circle me-2"></i>

                            Bohong : DOSAAA!!!

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
                            SUCCESS
                        ======================================== */}

                        {success && (

                            <div className="alert alert-success">

                                {success}

                            </div>

                        )}


                        {/* ========================================
                            SUBMIT
                        ======================================== */}

                        <button
                            type="button"
                            className="btn btn-primary w-100"
                            onClick={handleSubmit}
                            disabled={loading}
                        >

                            {loading ? (

                                <>

                                    <span
                                        className="
                                            spinner-border
                                            spinner-border-sm
                                            me-2
                                        "
                                    />

                                    Mengirim...

                                </>

                            ) : (

                                <>

                                    <i className="bi bi-send-fill me-2"></i>

                                    Kirim Presensi

                                </>

                            )}

                        </button>

                    </>

                )}

            </div>

        </div>

    );

};

export default PresensiForm;