'use client';

import { Trash2, Trash, SearchIcon, PlusIcon, EyeIcon, Download, Cloud } from "lucide-react";
import { use, useCallback, useEffect, useMemo, useState } from "react";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, Input, Button, Pagination, useDisclosure, ChipProps, Chip } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useFiles } from "@/components/provider/FileProvider";
import { generateKey, generatePrime } from "crypto";
import { v4 as uuidv4 } from 'uuid';
import { deleteCloudFile, downloadFile, deleteCloudFiles } from "@/utils/cloudinary";
import toast from "react-hot-toast";

interface CloudFile {
    name: string;
    isEncrypted: boolean;
    bytes: number;
    url: string;
}

interface ICloudFilesListProps {
    loadCloudFiles: () => void;
}


const CloudFilesList = (
    { loadCloudFiles }: ICloudFilesListProps
) => {
    const { cloudFiles, setCloudFiles } = useFiles();
    const [isCheckAll, setIsCheckAll] = useState<boolean>(false);
    const [filterValue, setFilterValue] = useState("");
    const [selectedKeys, setSelectedKeys] = useState(new Set<string>([]));
    const [selectedPublicIds, setSelectedPublicIds] = useState<string[]>([]);
    const [rowsPerPage, setRowsPerPage] = useState(8);
    const [page, setPage] = useState(1);
    const router = useRouter();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    useEffect(() => {
        setSelectedPublicIds(Array.from(selectedKeys));
    }, [selectedKeys]);

    useEffect(() => {
        console.log("Selected PublicIDs: ", selectedPublicIds);
    }, [selectedPublicIds]);

    // useEffect(() => {
    //     console.log("Selected Keys Values: ", selectedKeys.values());
    // }, [selectedKeys]);


    const hasSearchFilter = Boolean(filterValue);

    const filteredItems = useMemo(() => {
        let filteredFiles = [...cloudFiles];

        if (hasSearchFilter) {
            filteredFiles = filteredFiles.filter((file) =>
                file.name.toLowerCase().includes(filterValue.toLowerCase()),
            );
        }

        return filteredFiles;
    }, [cloudFiles, filterValue]);

    // useEffect(() => {
    //     console.log("Filter Items: ", filteredItems);
    // }, [filteredItems]);

    const pages = Math.ceil(filteredItems.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);


    const onSearchChange = useCallback((value?: string) => {
        if (value) {
            setFilterValue(value);
        } else {
            setFilterValue("");
        }
    }, []);

    const onNextPage = useCallback(() => {
        if (page < pages) {
            setPage(page + 1);
        }
    }, [page, pages]);

    const onPreviousPage = useCallback(() => {
        if (page > 1) {
            setPage(page - 1);
        }
    }, [page]);

    const columns = [
        {
            key: "fileName",
            title: "File Name"
        },
        {
            key: "size",
            title: "Size"
        },
        // {
        //     key: "status",
        //     title: "Encrypted Status"
        // },
        {
            key: "actions",
            title: "Actions"
        }
    ];

    const removeSelectedFiles = async () => {
        await deleteCloudFiles(selectedPublicIds).then(() => {
            loadCloudFiles();
            setSelectedKeys(new Set<string>([]));
            toast.success("Files removed successfully");
        }).catch((error) => {
            toast.error("Failed to remove files");
        });
    }

    const topContent = useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">
                    <Input
                        classNames={{
                            base: "w-full sm:max-w-[44%]",
                            inputWrapper: "border-1",
                        }}
                        placeholder="Search by name..."
                        size="sm"
                        startContent={<SearchIcon className="text-default-300" />}
                        value={filterValue}
                        variant="bordered"
                        onClear={() => setFilterValue("")}
                        onValueChange={onSearchChange}
                    />
                    <div className="flex gap-3">
                        {/* <Button
                            variant="flat"
                            startContent={<Download className="w-4 h-4" />}
                            size="sm"
                        >
                            Download
                        </Button> */}
                        <Button
                            variant="flat"
                            startContent={<Trash className="w-4 h-4" />}
                            size="sm"
                            onClick={removeSelectedFiles}
                        >
                            Remove
                        </Button>
                        <Button
                            color="primary"
                            startContent={<Cloud className="w-4 h-4" />}
                            size="sm"
                            onClick={loadCloudFiles}
                        >
                            Sync
                        </Button>
                    </div>
                </div>
            </div>
        );
    }, [
        filterValue,
        onSearchChange,
        cloudFiles.length,
        hasSearchFilter,
    ]);




    const renderCell = useCallback((file: CloudFile, columnKey: React.Key) => {
        const cellValue = file[columnKey as keyof CloudFile];

        if (typeof cellValue === 'function') {
            return <div>Function</div>;
        }

        switch (columnKey) {
            case "fileName":
                return (
                    <div>{file.name}</div>
                );

            case "status":
                return (
                    <Chip className="capitalize" color={file.isEncrypted ? "success" : "danger"}>{file.isEncrypted ? (
                        <span>Encrypted</span>
                    ) : (
                        <span>Decrypted</span>
                    )}</Chip>
                );

            case "size":
                return (
                    <div>{(file.bytes / (1024)).toFixed(2)} KB</div>
                );

            case "actions":
                return (
                    <div className="relative flex gap-2">
                        <span className="text-lg cursor-pointer active:opacity-50" onClick={() => { handleDownloadFile(file.url, file.name) }}>
                            <Download />
                        </span>
                        <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => { handleRemoveCloudFile(file.name) }}>
                            <Trash2 />
                        </span>
                    </div>
                );

            default:
                return cellValue;
        }
    }, []);

    const bottomContent = useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between items-center">
                <span className="w-[30%] text-small text-default-400">
                    {selectedKeys.size === undefined ? "All items selected" : `${selectedKeys.size} of ${filteredItems.length} selected`}
                </span>
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={page}
                    total={pages}
                    onChange={setPage}
                />
                <div className="hidden sm:flex w-[30%] justify-end gap-2">
                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
                        Previous
                    </Button>
                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
                        Next
                    </Button>
                </div>
            </div>
        );
    }, [selectedKeys, items.length, page, pages, hasSearchFilter]);


    const generateUUID = () => {
        return uuidv4();
    }

    const handleDownloadFile = async (fileURL: string, fileName: string) => {
        await downloadFile(fileURL, "../downloads/" + fileName).then(() => {
            toast.success("File downloaded successfully");
        }).catch((error) => {
            toast.error("Failed to download file");
        });
    }


    const handleRemoveCloudFile = async (fileName: string) => {
        console.log("Remove File: ", fileName);
        await deleteCloudFile(fileName).then(() => {
            loadCloudFiles();
            toast.success("File removed successfully");
        }).catch((error) => {
            toast.error("Failed to remove file");
        });
    }



    return (
        <Table
            aria-label="Cloud files List"
            selectionMode="multiple"
            classNames={{
                base: "overflow-auto",
            }}
            topContent={topContent}
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys as any}
            bottomContent={bottomContent}
        >
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn
                        key={column.key}
                    >
                        {column.title}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody items={items}>
                {(item) => (
                    <TableRow key={item.name}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}

export default CloudFilesList;