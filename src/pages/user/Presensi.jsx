import React from "react";
import PresensiForm from "../../components/userComponents/PresensiComponents/PresensiForm";

const Presensi = () => {

    return (
        <div
            style={{
                minHeight: "100vh",
                backgroundColor: "#f5f6f8",
                // padding: "24px",
            }}
        >

            <div className="container">
                <PresensiForm />
            </div>
        </div>
    );
};

export default Presensi;