import React from "react";

const columns = [
    { name: "Files Name", key: "name", uid: "Files Name", sortable: true },
    { name: "Size", key:"size" ,uid: "Size", sortable: true },
    { name: "Date Modified", key:"dateModified", uid: "Date Modified", sortable: true },
    { name: "Status", key:"status" ,uid: "Status", sortable: true },
    { name: "Actions", key:"actions", uid: "Actions" },
];

const statusOptions = [
    { name: "Encrypted", uid: "Encrypted" }, 
    { name: "Decrypted", uid: "Decrypted" },
];

const cloudFiles = [
    { name: "File 0", size: 10, dateModified: "2022-01-01", status: "Encrypted" },
    { name: "File 2", size: 5, dateModified: "2022-01-02", status: "Decrypted" },
    { name: "File 3", size: 8, dateModified: "2022-01-03", status: "Encrypted" },
    { name: "File 4", size: 12, dateModified: "2022-01-04", status: "Decrypted" },
    { name: "File 5", size: 15, dateModified: "2022-01-05", status: "Encrypted" },
    { name: "File 6", size: 7, dateModified: "2022-01-06", status: "Decrypted" },
    { name: "File 7", size: 9, dateModified: "2022-01-07", status: "Encrypted" },
    { name: "File 8", size: 11, dateModified: "2022-01-08", status: "Decrypted" },
    { name: "File 9", size: 6, dateModified: "2022-01-09", status: "Encrypted" },
    { name: "File 10", size: 14, dateModified: "2022-01-10", status: "Decrypted" },
    { name: "File 11", size: 13, dateModified: "2022-01-11", status: "Encrypted" },
    { name: "File 12", size: 3, dateModified: "2022-01-12", status: "Decrypted" },
    { name: "File 13", size: 4, dateModified: "2022-01-13", status: "Encrypted" },
    { name: "File 14", size: 2, dateModified: "2022-01-14", status: "Decrypted" },
    { name: "File 15", size: 1, dateModified: "2022-01-15", status: "Encrypted" },
    { name: "File 16", size: 20, dateModified: "2022-01-16", status: "Decrypted" },
    { name: "File 17", size: 18, dateModified: "2022-01-17", status: "Encrypted" },
    { name: "File 18", size: 16, dateModified: "2022-01-18", status: "Decrypted" },
    { name: "File 19", size: 17, dateModified: "2022-01-19", status: "Encrypted" },
    { name: "File 20", size: 19, dateModified: "2022-01-20", status: "Decrypted" },
    { name: "File 21", size: 22, dateModified: "2022-01-21", status: "Encrypted" },
    { name: "File 22", size: 25, dateModified: "2022-01-22", status: "Decrypted" },
    { name: "File 23", size: 28, dateModified: "2022-01-23", status: "Encrypted" },
    { name: "File 24", size: 30, dateModified: "2022-01-24", status: "Decrypted" },
    { name: "File 25", size: 35, dateModified: "2022-01-25", status: "Encrypted" },
    { name: "File 26", size: 27, dateModified: "2022-01-26", status: "Decrypted" },
    { name: "File 27", size: 29, dateModified: "2022-01-27", status: "Encrypted" },
    { name: "File 28", size: 31, dateModified: "2022-01-28", status: "Decrypted" },
    { name: "File 29", size: 26, dateModified: "2022-01-29", status: "Encrypted" },
    { name: "File 30", size: 34, dateModified: "2022-01-30", status: "Decrypted" },
    { name: "File 31", size: 33, dateModified: "2022-01-31", status: "Encrypted" },
    { name: "File 32", size: 23, dateModified: "2022-02-01", status: "Decrypted" },
    { name: "File 33", size: 24, dateModified: "2022-02-02", status: "Encrypted" },
    { name: "File 34", size: 21, dateModified: "2022-02-03", status: "Decrypted" },
    { name: "File 35", size: 36, dateModified: "2022-02-04", status: "Encrypted" },
    { name: "File 36", size: 32, dateModified: "2022-02-05", status: "Decrypted" },
    { name: "File 37", size: 39, dateModified: "2022-02-06", status: "Encrypted" },
    { name: "File 38", size: 37, dateModified: "2022-02-07", status: "Decrypted" },
    { name: "File 39", size: 38, dateModified: "2022-02-08", status: "Encrypted" },
    { name: "File 40", size: 40, dateModified: "2022-02-09", status: "Decrypted" },
];

export { columns, cloudFiles, statusOptions };
