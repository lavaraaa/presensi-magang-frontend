import React, { useState } from "react";
import axios from "axios";

const ModalTambahUser = ({
    show,
    onClose,
    onSuccess,
}) => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        position: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");


    if (!show) {
        return null;
    }


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
    // TAMBAH USER
    // ========================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);
        setMessage("");
        setError("");


        try {

            const token = localStorage.getItem("token");


            const response = await axios.post(
                "/admin/users",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );


            setMessage(
                response.data.message ||
                "User berhasil ditambahkan"
            );


            // Kosongkan form

            setFormData({
                name: "",
                email: "",
                position: "",
                password: "",
            });


            // Beritahu parent bahwa user berhasil ditambahkan

            if (onSuccess) {
                onSuccess();
            }


            // Tutup modal setelah berhasil

            setTimeout(() => {
                onClose();
            }, 1000);


        } catch (err) {

            console.error(
                "TAMBAH USER ERROR:",
                err
            );


            setError(
                err.response?.data?.message ||
                "Gagal menambahkan user"
            );

        } finally {

            setLoading(false);

        }

    };


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
                            Tambah Pengguna
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


                            {/* SUCCESS */}

                            {message && (

                                <div className="alert alert-success">
                                    {message}
                                </div>

                            )}


                            {/* ERROR */}

                            {error && (

                                <div className="alert alert-danger">
                                    {error}
                                </div>

                            )}


                            {/* NAMA */}

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
                                    disabled={loading}
                                    required
                                />

                            </div>


                            {/* EMAIL */}

                            <div className="mb-3">

                                <label className="form-label">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Masukkan email"
                                    disabled={loading}
                                    required
                                />

                            </div>


                            {/* POSISI */}

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
                                    placeholder="Contoh: Programmer"
                                    disabled={loading}
                                    required
                                />

                            </div>


                            {/* PASSWORD */}

                            <div className="mb-3">

                                <label className="form-label">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Masukkan password"
                                    disabled={loading}
                                    required
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
                                        ></span>

                                        Menambahkan...
                                    </>

                                ) : (

                                    <>
                                        <i className="bi bi-plus-lg me-2"></i>
                                        Tambah
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

export default ModalTambahUser;