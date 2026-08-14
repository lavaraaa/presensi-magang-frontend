import React, { useEffect, useState } from "react";
import axios from "axios";

const ModalResetPassword = ({
    show,
    user,
    onClose,
    onSuccess,
}) => {

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    // ========================================
    // RESET FORM SAAT MODAL DIBUKA
    // ========================================

    useEffect(() => {

        if (show) {

            setPassword("");
            setConfirmPassword("");
            setError("");
            setSuccess("");

        }

    }, [show]);


    // ========================================
    // SUBMIT
    // ========================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");


        // ========================================
        // CEK USER
        // ========================================

        if (!user?.id) {

            setError("ID user tidak ditemukan.");

            return;

        }


        // ========================================
        // CEK PASSWORD
        // ========================================

        if (password !== confirmPassword) {

            setError(
                "Password dan konfirmasi password tidak sama."
            );

            return;

        }


        if (password.length < 6) {

            setError(
                "Password minimal 6 karakter."
            );

            return;

        }


        try {

            setLoading(true);


            // ========================================
            // AMBIL TOKEN
            // ========================================

            const token = localStorage.getItem("token");


            if (!token) {

                setError(
                    "Token tidak ditemukan. Silakan login kembali."
                );

                return;

            }


            // ========================================
            // RESET PASSWORD
            // ========================================

            const response = await axios.put(

                `/admin/users/${user.id}/password`,

                {
                    password: password,
                },

                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }

            );


            console.log(
                "RESET PASSWORD:",
                response.data
            );


            // ========================================
            // BERHASIL
            // ========================================

            setSuccess(
                response.data.message ||
                "Password berhasil diubah."
            );


            // ========================================
            // REFRESH DATA USER
            // ========================================

            if (onSuccess) {

                await onSuccess();

            }


            // ========================================
            // TUTUP MODAL
            // ========================================

            setTimeout(() => {

                onClose();

            }, 800);


        } catch (error) {

            console.error(
                "RESET PASSWORD ERROR:",
                error
            );


            setError(
                error.response?.data?.message ||
                "Gagal mengubah password."
            );


        } finally {

            setLoading(false);

        }

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
                            Ubah Password
                        </h5>

                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                            disabled={loading}
                        />

                    </div>


                    <form onSubmit={handleSubmit}>


                        {/* ========================================
                            BODY
                        ======================================== */}

                        <div className="modal-body">

                            <p className="mb-1">
                                Ubah password untuk:
                            </p>

                            <strong>
                                {user?.name}
                            </strong>


                            {/* ERROR */}

                            {error && (

                                <div className="alert alert-danger mt-3">

                                    {error}

                                </div>

                            )}


                            {/* SUCCESS */}

                            {success && (

                                <div className="alert alert-success mt-3">

                                    {success}

                                </div>

                            )}


                            {/* PASSWORD BARU */}

                            <div className="mb-3 mt-3">

                                <label className="form-label">
                                    Password Baru
                                </label>

                                <input
                                    type="password"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Masukkan password baru"
                                    required
                                    disabled={loading}
                                />

                            </div>


                            {/* KONFIRMASI PASSWORD */}

                            <div className="mb-3">

                                <label className="form-label">
                                    Konfirmasi Password
                                </label>

                                <input
                                    type="password"
                                    className="form-control"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Masukkan ulang password"
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
                                className="btn btn-warning"
                                disabled={loading}
                            >

                                {loading ? (

                                    <>
                                        <span
                                            className="spinner-border spinner-border-sm me-2"
                                        />

                                        Menyimpan...
                                    </>

                                ) : (

                                    <>
                                        <i className="bi bi-key-fill me-2"></i>

                                        Ubah Password
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


export default ModalResetPassword;