import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import UserSidebar from "./UserSidebar";
import UserNavbar from "./UserNavbar";

const UserLayout = () => {
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
                    <UserSidebar />
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
                <UserNavbar
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

export default UserLayout;