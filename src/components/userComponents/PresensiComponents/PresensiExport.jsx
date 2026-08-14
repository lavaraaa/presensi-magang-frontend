import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const PresensiExport = ({ data }) => {
const formatTanggal = (tanggal) => {
const date = new Date(tanggal);
const day = String(date.getDate()).padStart(2, "0");
const month = String(date.getMonth() + 1).padStart(2, "0");
const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };
   
    const formatJam = (tanggal) => {
        if (!tanggal) {
            return "-";
        }
        const date =
            new Date(tanggal);

        const hours = String(
            date.getHours()
        ).padStart(2, "0");

        const minutes = String(
            date.getMinutes()
        ).padStart(2, "0");

        return `${hours}:${minutes}`;

    };

    const getRows = () => {const grouped = {};
    data.forEach((item) => {const date = new Date(item.created_at);
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
            if (
                item.jenis === "datang"
            ) {
                grouped[key].datang =
                    item;
                grouped[key].status =
                    item.status;
                grouped[key].keterangan =
                    item.keterangan || "";
                grouped[key].lokasi =
                    item.lokasi ||
                    "Puskesmas Mandiraja 2";
            }
            if (
                item.jenis === "pulang"
            ) {
                grouped[key].pulang =
                    item;
            }
        });


        return Object.values(grouped);
    };
    const getStatus = (item) => {

        if (
            item.datang?.status ===
            "hadir"
        ) {
            return "Hadir";
        }
        if (
            item.datang?.status ===
            "izin"
        ) {
            return "Izin";
        }
        if (
            item.datang?.status ===
            "sakit"
        ) {

            return "Sakit";

        }


        return "Tidak Hadir";

    };

    const handleExportPDF = () => {

        const rows =
            getRows();


        if (rows.length === 0) {

            alert(
                "Tidak ada data presensi untuk diekspor."
            );

            return;

        }
        const doc = new jsPDF({

            orientation: "landscape",

            unit: "mm",
            format: "a4",
        });
        const pageWidth =
            doc.internal.pageSize.getWidth();

        const pageHeight =
            doc.internal.pageSize.getHeight();
        const margin = 10;
        doc.setFont(
            "helvetica",
            "bold"
        );
        doc.setFontSize(16);
        doc.text(
            "Data Presensi Peserta Magang Puskesmas Mandiraja 2",
            pageWidth / 2,
            16,
            {
                align: "center",
            }
        );

        doc.setFont(
            "helvetica",
            "normal"
        );

        // doc.setFontSize(10);

        // doc.text(
        //     "Puskesmas Mandiraja 2",
        //     pageWidth / 2,
        //     23,
        //     {
        //         align: "center",
        //     }
        // );


        // ========================================
        // NAMA
        // ========================================

        const nama =
            rows[0]?.nama || "-";


        doc.setFontSize(9);

        doc.text(
            `Nama Peserta : ${nama}`,
            margin,
            33
        );


        // ========================================
        // DATA TABEL
        // ========================================

        const tableData =
            rows.map((item) => [

                formatTanggal(
                    item.tanggal
                ),

                item.nama || "-",

                item.datang
                    ? formatJam(
                        item.datang.created_at
                    )
                    : "-",

                item.pulang
                    ? formatJam(
                        item.pulang.created_at
                    )
                    : "-",

                getStatus(item),

                item.keterangan ||
                "-",

                item.lokasi ||
                "Puskesmas Mandiraja 2",

            ]);


        // ========================================
        // TABEL PDF
        // ========================================

        autoTable(doc, {

            startY: 39,

            margin: {
                left: margin,
                right: margin,
            },

            tableWidth:
                pageWidth -
                (margin * 2),

            head: [[

                "Tanggal",

                "Nama",

                "Datang",

                "Pulang",

                "Status",

                "Keterangan",

                "Lokasi",

            ]],

            body: tableData,


            theme: "grid",


            // ====================================
            // STYLE TABEL
            // ====================================

            styles: {

                font:
                    "helvetica",

                fontSize:
                    8,

                cellPadding:
                    2.5,

                overflow:
                    "linebreak",

                valign:
                    "middle",

                lineWidth:
                    0.2,

            },


            headStyles: {

                fontSize:
                    8,

                fontStyle:
                    "bold",

                halign:
                    "center",

                valign:
                    "middle",

            },


            // ====================================
            // LEBAR KOLOM
            // TOTAL 277 MM
            // ====================================

            columnStyles: {

                0: {
                    cellWidth: 28,
                    halign: "center",
                },

                1: {
                    cellWidth: 43,
                },

                2: {
                    cellWidth: 25,
                    halign: "center",
                },

                3: {
                    cellWidth: 25,
                    halign: "center",
                },

                4: {
                    cellWidth: 28,
                    halign: "center",
                },

                5: {
                    cellWidth: 60,
                },

                6: {
                    cellWidth: 68,
                },

            },


            // ====================================
            // WARNA STATUS
            // ====================================

            didParseCell: (hookData) => {

                if (
                    hookData.section ===
                        "body" &&
                    hookData.column.index ===
                        4
                ) {

                    const status =
                        hookData.cell.raw;


                    if (
                        status ===
                        "Hadir"
                    ) {

                        hookData.cell.styles.textColor =
                            [25, 135, 84];

                        hookData.cell.styles.fontStyle =
                            "bold";

                    }


                    if (
                        status ===
                        "Izin"
                    ) {

                        hookData.cell.styles.textColor =
                            [13, 110, 253];

                        hookData.cell.styles.fontStyle =
                            "bold";

                    }


                    if (
                        status ===
                        "Sakit"
                    ) {

                        hookData.cell.styles.textColor =
                            [220, 170, 0];

                        hookData.cell.styles.fontStyle =
                            "bold";

                    }


                    if (
                        status ===
                        "Tidak Hadir"
                    ) {

                        hookData.cell.styles.textColor =
                            [220, 53, 69];

                        hookData.cell.styles.fontStyle =
                            "bold";

                    }

                }

            },

        });


        // ========================================
        // FOOTER
        // ========================================

        const totalPages =
            doc.internal.getNumberOfPages();


        for (
            let page = 1;
            page <= totalPages;
            page++
        ) {

            doc.setPage(page);


            doc.setFont(
                "helvetica",
                "normal"
            );

            doc.setFontSize(8);


            doc.text(
                `Dicetak: ${new Date().toLocaleString(
                    "id-ID"
                )}`,
                margin,
                pageHeight - 7
            );


            doc.text(
                `Halaman ${page} dari ${totalPages}`,
                pageWidth - margin,
                pageHeight - 7,
                {
                    align: "right",
                }
            );

        }


        // ========================================
        // NAMA FILE
        // ========================================

        const fileName =
            `presensi-kamu-${new Date()
                .toISOString()
                .slice(0, 10)}.pdf`;


        // ========================================
        // DOWNLOAD
        // ========================================

        doc.save(fileName);


        // ========================================
        // BUKA PDF DI TAB BARU
        // ========================================

        const blob =
            doc.output("blob");


        const url =
            URL.createObjectURL(
                blob
            );


        window.open(
            url,
            "_blank"
        );

    };


    // ========================================
    // CETAK
    // ========================================

    const handlePrint = () => {

        const rows =
            getRows();


        if (rows.length === 0) {

            alert(
                "Tidak ada data presensi untuk dicetak."
            );

            return;

        }


        // ========================================
        // BUAT BARIS TABEL
        // ========================================

        let tableRows = "";


        rows.forEach((item) => {

            const status =
                getStatus(item);


            tableRows += `

                <tr>

                    <td>
                        ${formatTanggal(
                            item.tanggal
                        )}
                    </td>

                    <td>
                        ${item.nama || "-"}
                    </td>

                    <td class="center">
                        ${
                            item.datang
                                ? formatJam(
                                    item.datang.created_at
                                )
                                : "-"
                        }
                    </td>

                    <td class="center">
                        ${
                            item.pulang
                                ? formatJam(
                                    item.pulang.created_at
                                )
                                : "-"
                        }
                    </td>

                    <td class="center status-${status
                        .toLowerCase()
                        .replace(
                            " ",
                            "-"
                        )}">
                        ${status}
                    </td>

                    <td>
                        ${item.keterangan || "-"}
                    </td>

                    <td>
                        ${
                            item.lokasi ||
                            "Puskesmas Mandiraja 2"
                        }
                    </td>

                </tr>

            `;

        });


        // ========================================
        // BUKA TAB CETAK
        // ========================================

        const printWindow =
            window.open(
                "",
                "_blank"
            );


        if (!printWindow) {

            alert(
                "Popup diblokir browser. Izinkan popup untuk mencetak."
            );

            return;

        }


        // ========================================
        // HTML CETAK
        // ========================================

        printWindow.document.write(`

            <!DOCTYPE html>

            <html>

            <head>

                <title>
                    Presensi Kamu
                </title>


                <style>

                    * {
                        box-sizing: border-box;
                    }


                    html,
                    body {

                        margin: 0;

                        padding: 0;

                    }


                    body {

                        font-family:
                            Arial,
                            Helvetica,
                            sans-serif;

                        color: #222;

                        padding: 15mm;

                    }


                    .header {

                        text-align: center;

                        margin-bottom: 18px;

                    }


                    .header h1 {

                        margin: 0;

                        font-size: 20px;

                    }


                    .header p {

                        margin: 5px 0 0;

                        font-size: 12px;

                        color: #555;

                    }


                    .info {

                        margin-bottom: 10px;

                        font-size: 11px;

                    }


                    table {

                        width: 100%;

                        border-collapse:
                            collapse;

                        table-layout:
                            fixed;

                        font-size: 10px;

                    }


                    th,
                    td {

                        border:
                            1px solid #999;

                        padding: 6px;

                        vertical-align:
                            middle;

                        word-wrap:
                            break-word;

                        overflow-wrap:
                            break-word;

                    }


                    th {

                        background:
                            #eeeeee;

                        text-align:
                            center;

                        font-weight:
                            bold;

                    }


                    .center {

                        text-align:
                            center;

                    }


                    /* STATUS */

                    .status-hadir {

                        color:
                            #198754;

                        font-weight:
                            bold;

                    }


                    .status-izin {

                        color:
                            #0d6efd;

                        font-weight:
                            bold;

                    }


                    .status-sakit {

                        color:
                            #d6a500;

                        font-weight:
                            bold;

                    }


                    .status-tidak-hadir {

                        color:
                            #dc3545;

                        font-weight:
                            bold;

                    }


                    @media print {

                        @page {

                            size:
                                A4 landscape;

                            margin:
                                10mm;

                        }


                        body {

                            padding:
                                0;

                        }


                        .header {

                            margin-bottom:
                                12px;

                        }


                        table {

                            font-size:
                                9px;

                        }


                        th,
                        td {

                            padding:
                                5px;

                        }


                        tr {

                            page-break-inside:
                                avoid;

                        }

                    }

                </style>

            </head>


            <body>


                <div class="header">

                    <h1>
                       Data Presensi Peserta Magang Puskesmas Mandiraja 2
                    </h1>
                </div>


                <div class="info">

                    <strong>
                        Nama Peserta:
                    </strong>

                    ${rows[0]?.nama || "-"}

                </div>


                <table>

                    <thead>

                        <tr>

                            <th style="width: 10%;">
                                Tanggal
                            </th>

                            <th style="width: 15%;">
                                Nama
                            </th>

                            <th style="width: 8%;">
                                Datang
                            </th>

                            <th style="width: 8%;">
                                Pulang
                            </th>

                            <th style="width: 10%;">
                                Status
                            </th>

                            <th style="width: 22%;">
                                Keterangan
                            </th>

                            <th style="width: 27%;">
                                Lokasi
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        ${tableRows}

                    </tbody>

                </table>


            </body>

            </html>

        `);


        printWindow.document.close();

        printWindow.focus();


        setTimeout(() => {

            printWindow.print();

        }, 500);

    };


    // ========================================
    // RENDER
    // ========================================

    return (

        <div
            className="
                d-flex
                justify-content-end
                gap-2
                mb-3
                flex-wrap
            "
        >

            {/* ====================================
                EXPORT PDF
            ==================================== */}

            <button
                type="button"
                className="btn btn-danger"
                onClick={handleExportPDF}
                disabled={
                    !data ||
                    data.length === 0
                }
            >

                <i className="bi bi-file-earmark-pdf-fill me-2"></i>

                Export to PDF

            </button>


            {/* ====================================
                CETAK
            ==================================== */}

            <button
                type="button"
                className="btn btn-primary"
                onClick={handlePrint}
                disabled={
                    !data ||
                    data.length === 0
                }
            >

                <i className="bi bi-printer-fill me-2"></i>

                Cetak

            </button>

        </div>

    );

};


export default PresensiExport;