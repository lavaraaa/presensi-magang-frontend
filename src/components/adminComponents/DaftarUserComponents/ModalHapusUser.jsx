import React, { useState } from "react";
import axios from "axios";

const ModalHapusUser = ({
    show,
    user,
    onClose,
    onSuccess,
}) => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    // ========================================
    // HAPUS USER
    // ========================================

    const handleDelete = async () => {

        // ========================================
        // CEK USER
        // ========================================

        if (!user?.id) {

            setError(
                "ID pengguna tidak ditemukan."
            );

            return;

        }


        try {

            setLoading(true);
            setError("");


            // ========================================
            // AMBIL TOKEN
            // SAMA SEPERTI EDIT USER
            // ========================================

            const token =
                localStorage.getItem("token");


            // ========================================
            // CEK TOKEN
            // ========================================

            if (!token) {

                setError(
                    "Token tidak ditemukan. Silakan login kembali."
                );

                return;

            }


            // ========================================
            // HAPUS USER
            // ========================================

            const response = await axios.delete(
                `/admin/users/${user.id}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );


            console.log(
                "HAPUS USER:",
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
                "HAPUS USER ERROR:",
                error
            );


            setError(
                error.response?.data?.message ||
                "Gagal menghapus pengguna."
            );


        } finally {

            setLoading(false);

        }

    };


    // ========================================
    // RESET ERROR KETIKA MODAL DITUTUP
    // ========================================

    const handleClose = () => {

        if (loading) {
            return;
        }

        setError("");

        onClose();

    };


    // ========================================
    // JANGAN TAMPILKAN MODAL
    // ========================================

    if (!show) {

        return null;

    }


    return (

        <div
            className="modal d-block"
            tabIndex="-1"
            style={{
                backgroundColor:
                    "rgba(0,0,0,0.5)",
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
                            Hapus Pengguna
                        </h5>


                        <button
                            type="button"
                            className="btn-close"
                            onClick={handleClose}
                            disabled={loading}
                        />

                    </div>


                    {/* ========================================
                        BODY
                    ======================================== */}

                    <div className="modal-body">

                        <p className="mb-2">
                            Apakah kamu yakin ingin
                            menghapus akun:
                        </p>


                        <strong>
                            {user?.name}
                        </strong>


                        {user?.email && (

                            <div className="text-muted mt-1">
                                {user.email}
                            </div>

                        )}


                        {/* ========================================
                            ERROR
                        ======================================== */}

                        {error && (

                            <div className="alert alert-danger mt-3 mb-0">

                                {error}

                            </div>

                        )}


                        <p className="text-danger mt-3 mb-0">

                            <i className="bi bi-exclamation-triangle-fill me-2"></i>

                            Data pengguna yang dihapus
                            tidak dapat dikembalikan.

                        </p>

                    </div>


                    {/* ========================================
                        FOOTER
                    ======================================== */}

                    <div className="modal-footer">


                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={handleClose}
                            disabled={loading}
                        >

                            Batal

                        </button>


                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={handleDelete}
                            disabled={loading}
                        >

                            {loading ? (

                                <>
                                    <span
                                        className="spinner-border spinner-border-sm me-2"
                                        role="status"
                                    />

                                    Menghapus...
                                </>

                            ) : (

                                <>
                                    <i className="bi bi-trash me-2"></i>
                                    Hapus
                                </>

                            )}

                        </button>


                    </div>

                </div>

            </div>

        </div>

    );

};


export default ModalHapusUser;