import React, { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../../pages/auth/AuthContext";
import LogoutModal from "../../common/LogoutModal";
import logo from "../../../assets/logoputih.png";

const UserSidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const currentPath = location.pathname;

    const { logout } = useContext(AuthContext);

    const [showLogoutModal, setShowLogoutModal] = useState(false);


    // ========================================
    // MENU ADMIN
    // ========================================

    const menuItems = [
        {
            label: "Dashboard",
            path: "/dashboard",
            icon: "bi-house-door-fill",
        },
        {
            label: "Presensi",
            path: "/presensi",
            icon: "bi-calendar-check-fill",
        },
        {
            label: "Presensi Kamu",
            path: "/presensi-kamu",
            icon: "bi-file-earmark-text-fill",
        },
    ];

    const handleLogout = () => {
        setShowLogoutModal(false);

        logout();

        navigate("/");
    };

    return (
        <div
            className="text-black d-none d-lg-block"
            style={{
                backgroundColor: "#015E78",
                width: "210px",
                height: "100vh",
                position: "fixed",
                left: 0,
                top: 0,
                overflowY: "auto",
                zIndex: 9999,
                boxShadow: "1px 0 5px rgba(0,0,0,0.2)",
            }}
        >

            <div
                style={{
                    marginTop: 14,
                }}
            >
                <button
                    className="brand btn d-none d-lg-flex align-items-center"
                    style={{
                        fontSize: 20,
                        marginBottom: 15,
                        fontWeight: 600,
                        color: "#fff",
                    }}
                    onClick={() => navigate("/dashboard")}
                >
                    {/* <img
                        src={logo}
                        alt="Logo"
                        width="45"
                        height="45"
                        className="me-2"
                    /> */}

                    Presensi Magang
                </button>
            </div>
            <h5
                style={{
                    marginLeft: 8,
                    marginRight: 8,
                    paddingTop: 10,
                    paddingBottom: 8,
                    borderTop: "1px solid #ccc",
                    color: "#fff",
                }}
            >
                Menu
            </h5>


            {/* ==================================
                MENU
            ================================== */}

            <ul
                className="nav flex-column"
                style={{
                    padding: "0 8px",
                }}
            >

                {menuItems.map((item) => {

                    const isActive =
                        currentPath === item.path;

                    return (
                        <li
                            className="nav-item"
                            key={item.path}
                        >

                            <button
                                className="d-flex align-items-center w-100 border-0"
                                onClick={() =>
                                    navigate(item.path)
                                }
                                style={{
                                    borderRadius: "6px",
                                    padding: "10px",
                                    marginBottom: "5px",
                                    transition:
                                        "background-color 0.2s, color 0.2s",

                                    backgroundColor:
                                        isActive
                                            ? "rgba(255,255,255,0.15)"
                                            : "transparent",

                                    color:
                                        isActive
                                            ? "#00b2f8"
                                            : "#fff",

                                    fontWeight:
                                        isActive
                                            ? "bold"
                                            : "normal",

                                    fontSize: "16px",
                                    cursor: "pointer",
                                    textAlign: "left",
                                }}

                                onMouseEnter={(e) => {
                                    if (!isActive) {
                                        e.currentTarget.style.backgroundColor =
                                            "rgba(255,255,255,0.10)";
                                    }
                                }}

                                onMouseLeave={(e) => {
                                    if (!isActive) {
                                        e.currentTarget.style.backgroundColor =
                                            "transparent";
                                    }
                                }}
                            >

                                <i
                                    className={`bi ${item.icon} me-2`}
                                    style={{
                                        width: "22px",
                                        fontSize: "18px",
                                    }}
                                />

                                {item.label}

                            </button>

                        </li>
                    );
                })}

            </ul>


            {/* ==================================
                LOGOUT
            ================================== */}

            <div
                className="px-3"
                style={{
                    marginTop: 20,
                }}
            >
                <button
                    className="btn btn-danger w-100"
                    onClick={() =>
                        setShowLogoutModal(true)
                    }
                >
                    <i
                        className="bi bi-box-arrow-right"
                        style={{
                            marginRight: 5,
                            fontSize: 20,
                        }}
                    />

                    Logout
                </button>
            </div>


            <LogoutModal
                show={showLogoutModal}
                onClose={() =>
                    setShowLogoutModal(false)
                }
                onConfirm={handleLogout}
            />

        </div>
    );
};

export default UserSidebar;