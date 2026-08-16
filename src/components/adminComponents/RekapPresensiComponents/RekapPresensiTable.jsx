import React from "react";

const formatTanggal = (tanggal) => {

    const date = new Date(tanggal);

    return `${String(date.getDate()).padStart(2, "0")}-${String(
        date.getMonth() + 1
    ).padStart(2, "0")}-${date.getFullYear()}`;

};


const formatJam = (tanggal) => {

    if (!tanggal) {
        return "-";
    }

    const date = new Date(tanggal);

    return `${String(date.getHours()).padStart(2, "0")}:${String(
        date.getMinutes()
    ).padStart(2, "0")}`;

};


const getStatus = (item) => {

    if (item.datang?.status === "hadir") {
        return "Hadir";
    }

    if (item.datang?.status === "izin") {
        return "Izin";
    }

    if (item.datang?.status === "sakit") {
        return "Sakit";
    }

    return "Tidak Hadir";

};


const getStatusClass = (status) => {

    if (status === "Hadir") {
        return "text-success fw-semibold";
    }

    if (status === "Izin") {
        return "text-primary fw-semibold";
    }

    if (status === "Sakit") {
        return "text-warning fw-semibold";
    }

    return "text-danger fw-semibold";

};


const RekapPresensiTable = ({ data }) => {

    const grouped = {};


    data.forEach((item) => {

        const date = new Date(item.created_at);

        const tanggal =
            `${date.getFullYear()}-${String(
                date.getMonth() + 1
            ).padStart(2, "0")}-${String(
                date.getDate()
            ).padStart(2, "0")}`;


        const key =
            `${item.user_id}_${tanggal}`;


        if (!grouped[key]) {

            grouped[key] = {

                tanggal: item.created_at,

                nama: item.nama || "-",

                email: item.email || "-",

                datang: null,

                pulang: null,

                keterangan: "",

                lokasi: "Puskesmas Mandiraja 2",

            };

        }


        if (item.jenis === "datang") {

            grouped[key].datang = item;

            grouped[key].keterangan =
                item.keterangan || "";

            grouped[key].lokasi =
                item.lokasi ||
                "Puskesmas Mandiraja 2";

        }


        if (item.jenis === "pulang") {

            grouped[key].pulang = item;

        }

    });


    const rows = Object.values(grouped);


    return (

       <div className="presensi-table-wrapper">

            <table className="table table-hover align-middle mb-0">

                <thead>

                    <tr>

                        <th>Tanggal</th>
                        <th>Nama</th>
                        <th>Email</th>
                        <th>Datang</th>
                        <th>Pulang</th>
                        <th>Status</th>
                        <th>Keterangan</th>
                        <th>Lokasi</th>

                    </tr>

                </thead>


                <tbody>

                    {rows.map((item, index) => {

                        const status =
                            getStatus(item);


                        return (

                            <tr key={index}>

                                <td className="text-nowrap">
                                    {formatTanggal(
                                        item.tanggal
                                    )}
                                </td>

                                <td>
                                    {item.nama}
                                </td>

                                <td>
                                    {item.email}
                                </td>

                                <td className="text-nowrap">
                                    {item.datang
                                        ? formatJam(
                                            item.datang.created_at
                                        )
                                        : "-"
                                    }
                                </td>

                                <td className="text-nowrap">
                                    {item.pulang
                                        ? formatJam(
                                            item.pulang.created_at
                                        )
                                        : "-"
                                    }
                                </td>

                                <td
                                    className={
                                        getStatusClass(
                                            status
                                        )
                                    }
                                >
                                    {status}
                                </td>

                                <td>
                                    {item.keterangan || "-"}
                                </td>

                                <td>
                                    {item.lokasi || "-"}
                                </td>

                            </tr>

                        );

                    })}

                </tbody>

            </table>

        </div>

    );

};

export default RekapPresensiTable;