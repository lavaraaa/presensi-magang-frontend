import React, { useEffect, useState } from "react";
import axios from "axios";

import UserTable from "../../components/adminComponents/DaftarUserComponents/UserTable";
import ModalTambahUser from "../../components/adminComponents/DaftarUserComponents/ModalTambahUser";
import ModalEditUser from "../../components/adminComponents/DaftarUserComponents/ModalEditUser";
import ModalResetPassword from "../../components/adminComponents/DaftarUserComponents/ModalResetPassword";
import ModalHapusUser from "../../components/adminComponents/DaftarUserComponents/ModalHapusUser";

const DaftarUser = () => {

    // ========================================
    // STATE
    // ========================================

    const [users, setUsers] = useState([]);

    const [showTambah, setShowTambah] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showResetPassword, setShowResetPassword] = useState(false);
    const [showHapus, setShowHapus] = useState(false);

    const [selectedUser, setSelectedUser] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // SEARCH
    const [search, setSearch] = useState("");


    // ========================================
    // AMBIL DATA USER
    // ========================================

    const fetchUsers = async () => {

        try {

            setLoading(true);
            setError("");

            const token = localStorage.getItem("token");

            const response = await axios.get(
                "/admin/users",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log(
                "DATA USER:",
                response.data
            );

            setUsers(
                response.data.data || []
            );

        } catch (error) {

            console.error(
                "GET USERS ERROR:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Gagal mengambil data pengguna"
            );

        } finally {

            setLoading(false);

        }

    };


    // ========================================
    // LOAD DATA PERTAMA KALI
    // ========================================

    useEffect(() => {

        fetchUsers();

    }, []);


    // ========================================
    // FILTER USER BERDASARKAN SEARCH
    // ========================================

    const filteredUsers = users.filter((user) => {

        const keyword = search
            .toLowerCase()
            .trim();

        // Kalau search kosong, tampilkan semua
        if (!keyword) {
            return true;
        }

        const name = (user.name || "")
            .toLowerCase();

        const position = (user.position || "")
            .toLowerCase();

        const email = (user.email || "")
            .toLowerCase();

        return (
            name.includes(keyword) ||
            position.includes(keyword) ||
            email.includes(keyword)
        );

    });


    // ========================================
    // EDIT
    // ========================================

    const handleEdit = (user) => {

        setSelectedUser(user);

        setShowEdit(true);

    };


    // ========================================
    // RESET PASSWORD
    // ========================================

    const handleResetPassword = (user) => {

        setSelectedUser(user);

        setShowResetPassword(true);

    };


    // ========================================
    // HAPUS
    // ========================================

    const handleHapus = (user) => {

        setSelectedUser(user);

        setShowHapus(true);

    };


    return (

        <div>


            {/* ========================================
                HEADER
            ======================================== */}

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h3 className="mb-1">
                        Daftar Pengguna
                    </h3>

                    <p className="text-muted mb-0">
                        Kelola akun peserta magang
                    </p>

                </div>


                <button
                    className="btn btn-primary"
                    onClick={() => setShowTambah(true)}
                >

                    <i className="bi bi-plus-lg me-2"></i>

                    Tambah User

                </button>

            </div>


            {/* ========================================
                SEARCH
            ======================================== */}

            <div className="mb-4">

                <div
                    className="input-group"
                    style={{
                        maxWidth: "500px",
                    }}
                >

                    <span className="input-group-text bg-white">

                        <i className="bi bi-search"></i>

                    </span>


                    <input
                        type="text"
                        className="form-control"
                        placeholder="Cari nama, posisi, atau email..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />


                    {search && (

                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => setSearch("")}
                            title="Hapus pencarian"
                        >

                            <i className="bi bi-x-lg"></i>

                        </button>

                    )}

                </div>


                {/* HASIL PENCARIAN */}

                {!loading && search && (

                    <small className="text-muted d-block mt-2">

                        Menampilkan{" "}
                        <strong>
                            {filteredUsers.length}
                        </strong>{" "}
                        dari{" "}
                        <strong>
                            {users.length}
                        </strong>{" "}
                        pengguna

                    </small>

                )}

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
                TABLE / LOADING
            ======================================== */}

            {loading ? (

                <div className="text-center py-5">

                    <div
                        className="spinner-border"
                        role="status"
                    />

                    <p className="text-muted mt-2">
                        Memuat data pengguna...
                    </p>

                </div>

            ) : (

                <UserTable
                    users={filteredUsers}
                    onEdit={handleEdit}
                    onResetPassword={handleResetPassword}
                    onDelete={handleHapus}
                />

            )}


            {/* ========================================
                TAMBAH USER
            ======================================== */}

            <ModalTambahUser

                show={showTambah}

                onClose={() => {

                    setShowTambah(false);

                }}

                onSuccess={fetchUsers}

            />


            {/* ========================================
                EDIT USER
            ======================================== */}

            <ModalEditUser

                show={showEdit}

                user={selectedUser}

                onSuccess={fetchUsers}

                onClose={() => {

                    setShowEdit(false);

                    setSelectedUser(null);

                }}

            />


            {/* ========================================
                RESET PASSWORD
            ======================================== */}

            <ModalResetPassword

                show={showResetPassword}

                user={selectedUser}

                onSuccess={fetchUsers}

                onClose={() => {

                    setShowResetPassword(false);

                    setSelectedUser(null);

                }}

            />


            {/* ========================================
                HAPUS USER
            ======================================== */}

            <ModalHapusUser

                show={showHapus}

                user={selectedUser}

                onClose={() => {

                    setShowHapus(false);

                    setSelectedUser(null);

                }}

                onSuccess={fetchUsers}

            />

        </div>

    );

};


export default DaftarUser;