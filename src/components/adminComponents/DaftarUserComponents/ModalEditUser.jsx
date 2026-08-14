import React, { useEffect, useState } from "react";
import axios from "axios";

const ModalEditUser = ({
    show,
    user,
    onClose,
    onSuccess,
}) => {

    const [formData, setFormData] = useState({
        name: "",
        position: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    // ========================================
    // ISI FORM SAAT USER DIPILIH
    // ========================================

    useEffect(() => {

        if (user) {

            setFormData({
                name: user.name || "",
                position: user.position || "",
            });

            setError("");

        }

    }, [user]);


    // ========================================
    // HANDLE INPUT
    // ========================================

    const handleChange = (e) => {

        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));

    };


    // ========================================
    // SUBMIT EDIT USER
    // ========================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!user?.id) {

            setError("ID pengguna tidak ditemukan.");

            return;

        }


        try {

            setLoading(true);
            setError("");

            const token = localStorage.getItem("token");


            // ========================================
            // UPDATE USER
            // ========================================

            const response = await axios.put(
                `/admin/users/${user.id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );


            console.log(
                "EDIT USER:",
                response.data
            );


            // ========================================
            // AMBIL DATA TERBARU
            // ========================================

            if (onSuccess) {

                await onSuccess();

            }


            // ========================================
            // TUTUP MODAL
            // ========================================

            onClose();


        } catch (error) {

            console.error(
                "EDIT USER ERROR:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Gagal mengubah data pengguna."
            );

        } finally {

            setLoading(false);

        }

    };


    // ========================================
    // JIKA MODAL TIDAK DITAMPILKAN
    // ========================================

    if (!show) {

        return null;

    }


    return (

        <div
            className="modal d-block"
            tabIndex="-1"
            style={{
                backgroundColor: "rgba(0,0,0,0.5)",
                zIndex: 1055,
            }}
        >

            <div className="modal-dialog modal-dialog-centered">

                <div className="modal-content">


                    {/* ========================================
                        HEADER
                    ======================================== */}

                    <div className="modal-header">

                        <h5 className="modal-title">
                            Edit Pengguna
                        </h5>

                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                            disabled={loading}
                        />

                    </div>


                    {/* ========================================
                        FORM
                    ======================================== */}

                    <form onSubmit={handleSubmit}>

                        <div className="modal-body">


                            {/* ========================================
                                ERROR
                            ======================================== */}

                            {error && (

                                <div className="alert alert-danger">

                                    {error}

                                </div>

                            )}


                            {/* ========================================
                                NAMA
                            ======================================== */}

                            <div className="mb-3">

                                <label className="form-label">
                                    Nama
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Masukkan nama"
                                    required
                                    disabled={loading}
                                />

                            </div>


                            {/* ========================================
                                POSISI
                            ======================================== */}

                            <div className="mb-3">

                                <label className="form-label">
                                    Posisi
                                </label>

                                <input
                                    type="text"
                                    name="position"
                                    className="form-control"
                                    value={formData.position}
                                    onChange={handleChange}
                                    placeholder="Masukkan posisi"
                                    required
                                    disabled={loading}
                                />

                            </div>


                        </div>


                        {/* ========================================
                            FOOTER
                        ======================================== */}

                        <div className="modal-footer">

                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={onClose}
                                disabled={loading}
                            >
                                Batal
                            </button>


                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={loading}
                            >

                                {loading ? (

                                    <>
                                        <span
                                            className="spinner-border spinner-border-sm me-2"
                                            role="status"
                                        />

                                        Menyimpan...
                                    </>

                                ) : (

                                    <>
                                        <i className="bi bi-check-lg me-2"></i>
                                        Simpan Perubahan
                                    </>

                                )}

                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>

    );

};


export default ModalEditUser;