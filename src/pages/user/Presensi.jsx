import React from "react";
import PresensiForm from "../../components/userComponents/PresensiComponents/PresensiForm";

const Presensi = () => {

    return (
        <div
            style={{
                minHeight: "100vh",
                backgroundColor: "#f5f6f8",
                padding: "24px",
            }}
        >

            <div className="container">

                <div className="mb-4">

                    <h3 className="mb-1">
                        Presensi
                    </h3>

                    <p className="text-muted mb-0">
                        Silakan lakukan presensi datang atau pulang.
                    </p>

                </div>


                <PresensiForm />

            </div>

        </div>
    );
};

export default Presensi;