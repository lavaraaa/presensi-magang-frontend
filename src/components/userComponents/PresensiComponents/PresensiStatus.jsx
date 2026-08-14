import React from "react";

const PresensiStatus = ({ status }) => {

    let text = "Belum Ada Data";
    let className = "text-secondary";


    if (status === "hadir") {

        text = "Hadir";

        className = "text-success fw-semibold";

    }

    else if (status === "izin") {

        text = "Izin";

        className = "text-primary fw-semibold";

    }

    else if (status === "sakit") {

        text = "Sakit";

        className = "text-warning fw-semibold";

    }

    else if (status === "tidak hadir") {

        text = "Tidak Hadir";

        className = "text-danger fw-semibold";

    }


    return (

        <span className={className}>

            {text}

        </span>

    );

};

export default PresensiStatus;