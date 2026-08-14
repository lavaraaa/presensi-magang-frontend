import React from "react";

const UserTable = ({
    users,
    onEdit,
    onResetPassword,
    onDelete,
}) => {

    return (
        <div className="card border-0 shadow-sm">

            <div className="card-body p-0">

                <div className="table-responsive">

                    <table className="table table-hover align-middle mb-0">

                        <thead className="table-light">
                            <tr>

                                <th
                                    style={{
                                        width: "60px",
                                    }}
                                >
                                    No
                                </th>

                                <th>
                                    Nama
                                </th>

                                <th>
                                    Email
                                </th>

                                <th>
                                    Posisi
                                </th>

                                <th
                                    className="text-center"
                                    style={{
                                        width: "270px",
                                    }}
                                >
                                    Aksi
                                </th>

                            </tr>
                        </thead>


                        <tbody>

                            {users.length === 0 ? (

                                <tr>
                                    <td
                                        colSpan="5"
                                        className="text-center text-muted py-5"
                                    >
                                        Belum ada pengguna
                                    </td>
                                </tr>

                            ) : (

                                users.map((user, index) => (

                                    <tr key={user.id}>

                                        <td>
                                            {index + 1}
                                        </td>

                                        <td>
                                            {user.name}
                                        </td>

                                        <td>
                                            {user.email}
                                        </td>

                                        <td>
                                            {user.position}
                                        </td>

                                        <td className="text-center">

                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline-primary me-1"
                                                onClick={() =>
                                                    onEdit(user)
                                                }
                                                title="Edit User"
                                            >
                                                <i className="bi bi-pencil"></i>
                                                Edit
                                            </button>


                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline-warning me-1"
                                                onClick={() =>
                                                    onResetPassword(user)
                                                }
                                                title="Reset Password"
                                            >
                                                <i className="bi bi-key"></i>
                                                Reset Password
                                            </button>


                                            {/* <button
                                                type="button"
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() =>
                                                    onDelete(user)
                                                }
                                                title="Hapus User"
                                            >
                                                <i className="bi bi-trash"></i>
                                                Hapus
                                            </button> */}

                                        </td>

                                    </tr>

                                ))

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
};

export default UserTable;