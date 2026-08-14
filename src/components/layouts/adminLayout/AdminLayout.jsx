import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";

const AdminLayout = () => {
    const [isLargeScreen, setIsLargeScreen] = useState(
        window.innerWidth >= 992
    );

    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth >= 992);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div style={{ display: "flex" }}>

            {/* SIDEBAR DESKTOP */}
            {isLargeScreen && (
                <div
                    style={{
                        position: "fixed",
                        height: "100vh",
                        zIndex: 9999,
                    }}
                >
                    <AdminSidebar />
                </div>
            )}

            {/* KONTEN UTAMA */}
            <div
                style={{
                    flex: 1,
                    minHeight: "100vh",
                    paddingLeft: isLargeScreen
                        ? "210px"
                        : "0",
                    boxSizing: "border-box",
                }}
            >

                {/* NAVBAR */}
                <AdminNavbar
                    isShifted={isLargeScreen}
                />

                {/* ISI HALAMAN */}
                <div
                    style={{
                        width: "100%",
                        boxSizing: "border-box",
                        padding: 20,
                    }}
                >
                    <Outlet />
                </div>

            </div>

        </div>
    );
};

export default AdminLayout;