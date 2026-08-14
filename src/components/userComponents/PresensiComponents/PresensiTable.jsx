import React from "react";

import PresensiStatus from "./PresensiStatus";


const formatTanggal = (tanggal) => {

    const date = new Date(tanggal);

    const day = String(
        date.getDate()
    ).padStart(2, "0");

    const month = String(
        date.getMonth() + 1
    ).padStart(2, "0");

    const year =
        date.getFullYear();

    return `${day}-${month}-${year}`;

};


const formatJam = (tanggal) => {

    if (!tanggal) {
        return "-";
    }

    const date = new Date(tanggal);

    const hours = String(
        date.getHours()
    ).padStart(2, "0");

    const minutes = String(
        date.getMinutes()
    ).padStart(2, "0");

    return `${hours}:${minutes}`;

};


const PresensiTable = ({ data }) => {

    // ========================================
    // DATA DARI BACKEND
    // DIKELOMPOKKAN BERDASARKAN TANGGAL
    // ========================================

    const grouped = {};


    data.forEach((item) => {

        const date =
            new Date(item.created_at);

        const key =
            `${date.getFullYear()}-${String(
                date.getMonth() + 1
            ).padStart(2, "0")}-${String(
                date.getDate()
            ).padStart(2, "0")}`;


        if (!grouped[key]) {

            grouped[key] = {

                tanggal:
                    item.created_at,

               nama:
    item.nama || "-",

                datang: null,

                pulang: null,

                status: null,

                keterangan: "",

                lokasi:
                    item.lokasi ||
                    "Puskesmas Mandiraja 2",

            };

        }


        // ========================================
        // DATANG
        // ========================================

        if (item.jenis === "datang") {

            grouped[key].datang = item;


            grouped[key].status =
                item.status;


            grouped[key].keterangan =
                item.keterangan || "";

            grouped[key].lokasi =
                item.lokasi ||
                "Puskesmas Mandiraja 2";

        }


        // ========================================
        // PULANG
        // ========================================

        if (item.jenis === "pulang") {

            grouped[key].pulang = item;

        }

    });


    const rows =
        Object.values(grouped);


    // ========================================
    // TENTUKAN STATUS
    // ========================================

    const getStatus = (item) => {

        if (
            !item.datang &&
            !item.pulang
        ) {

            return "tidak hadir";

        }


        if (
            item.datang?.status === "izin"
        ) {

            return "izin";

        }


        if (
            item.datang?.status === "sakit"
        ) {

            return "sakit";

        }


        if (
            item.datang?.status === "hadir"
        ) {

            return "hadir";

        }


        return "tidak hadir";

    };


    return (

        <div className="table-responsive">

            <table
                className="
                    table
                    table-hover
                    align-middle
                    mb-0
                "
            >

                <thead>

                    <tr>

                        <th>
                            Tanggal
                        </th>

                        <th>
                            Nama
                        </th>

                        <th>
                            Datang
                        </th>

                        <th>
                            Pulang
                        </th>

                        <th>
                            Status
                        </th>

                        <th>
                            Keterangan
                        </th>

                        <th>
                            Lokasi
                        </th>

                    </tr>

                </thead>


                <tbody>

                    {rows.map((item, index) => {

                        const status =
                            getStatus(item);


                        return (

                            <tr
                                key={index}
                            >

                                <td className="text-nowrap">

                                    {formatTanggal(
                                        item.tanggal
                                    )}

                                </td>


                                <td>

                                    {item.nama}

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


                                <td className="text-nowrap">

                                    <PresensiStatus
                                        status={status}
                                    />

                                </td>


                                <td>

                                    {item.keterangan ||
                                        "-"
                                    }

                                </td>


                                <td>

                                    {item.lokasi ||
                                        "-"
                                    }

                                </td>

                            </tr>

                        );

                    })}

                </tbody>

            </table>

        </div>

    );

};


export default PresensiTable;