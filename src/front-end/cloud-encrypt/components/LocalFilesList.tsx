'use client';

import { Trash2, Trash, SearchIcon, PlusIcon, EyeIcon, Download, Eye, KeyRound, Key  } from "lucide-react";
import { use, useCallback, useEffect, useMemo, useState } from "react";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, Input, Button, Pagination, useDisclosure, Chip } from "@nextui-org/react";
// import { localFiles, columns, statusOptions } from "@/components/sampledata/sampledata";
import { useRouter } from "next/navigation";
import ModalAskPassword from "@/components/modals/modal-ask-password";
import { getLocalFiles,decryptFile } from "@/utils/localFileHandler";
import { useFiles } from "@/components/provider/FileProvider";


interface LocalFile {
    name: string;
    bytes: number;
    dateModified: string;
    isEncrypted: boolean;
}

const LocalFilesList = () => {
    const { localFiles, setLocalFiles } = useFiles();
    const [isCheckAll, setIsCheckAll] = useState<boolean>(false);
    const [filterValue, setFilterValue] = useState("");
    const [selectedKeys, setSelectedKeys] = useState(new Set<string>([]));
    const [rowsPerPage, setRowsPerPage] = useState(8);
    const [page, setPage] = useState(1);
    const router = useRouter();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [password, setPassword] = useState<string>("");
    const [selectedFilePath, setSelectedFilePath] = useState<string>("");

    // useEffect(() => {
    //     console.log("Local Files: ", localFiles);
    // }, [localFiles]);

    useEffect(() => {
        console.log("[LocalFileList.tsx] Password:", password);
    }, [password]);

    useEffect(() => {
        console.log("[LocalFileList.tsx] Selected File Path:", selectedFilePath);
    }, [selectedFilePath]);


    const loadLocalFiles = async () => {
        const files = await getLocalFiles();
        setLocalFiles(files.map(file => ({
            name: file.name,
            bytes: file.size,
            dateModified: file.updatedAt.toString(),
            isEncrypted: true
        })));
    }

    const hasSearchFilter = Boolean(filterValue);

    const filteredItems = useMemo(() => {
        let filteredFiles = [...localFiles];

        if (hasSearchFilter) {
            filteredFiles = filteredFiles.filter((file) =>
                file.name.toLowerCase().includes(filterValue.toLowerCase()),
            );
        }

        return filteredFiles;
    }, [localFiles, filterValue]);


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

    const showFileContent = async (name:string) => {
        // await openFile(name);
        // onOpen();
        //console.log("Show File Content");
        window.electron.openFile(name)
    }

    const handleDecrypt = (fileName: string) => {
        setSelectedFilePath("../downloads/" + fileName);
        onOpen();
    }

    const columns = [
        {
            key: "fileName",
            title: "File Name"
        },
       
        // {
        //     key: "dateModified",
        //     title: "Date Modified"
        // },
        {
            key: "size",
            title: "Size"
        },
        // {
        //     key: "status",
        //     title: "Status"
        // },
        {
            key: "actions",
            title: "Actions"
        }
    ];


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
                        <Button
                            variant="flat"
                            startContent={<Trash className="w-4 h-4" />}
                            size="sm"
                        >
                            Remove
                        </Button>
                        <Button
                            color="primary"
                            startContent={<Trash className="w-4 h-4" />}
                            size="sm"
                            onClick={loadLocalFiles}
                        >
                            Load Files
                        </Button>
                    </div>
                </div>
            </div>
        );
    }, [
        filterValue,
        onSearchChange,
        localFiles.length,
        hasSearchFilter,
    ]);

    const renderCell = useCallback((file: LocalFile, columnKey: React.Key) => {
        const cellValue = file[columnKey as keyof LocalFile];
        // console.log("Cell Value: ", cellValue);

        if (typeof cellValue === 'function') {
            return <div>Function</div>;
        }

        switch (columnKey) {
            case "fileName":
                return (
                    <div>{file.name}</div>
                );

            case "size":
                return (
                    <div>{(file.bytes / 1024).toFixed(2)} KB</div>
                );

            case "dateModified":
                return (
                    <div>{file.dateModified} MB</div>
                );

            case "status":
                return (
                    <Chip className="capitalize" color={file.isEncrypted ? "success" : "danger"}>{file.isEncrypted ? (
                        <span>Encrypted</span>
                    ) : (
                        <span>Decrypted</span>
                    )}</Chip>
                );

            case "actions":
                return (
                    <div className="relative flex gap-2">
                        <span className="text-lg cursor-pointer active:opacity-50" onClick={() => {showFileContent(file.name)}} >
                            <Eye />
                        </span>
                        <span className="text-lg cursor-pointer active:opacity-50" onClick={() => handleDecrypt(file.name)}>
                            <KeyRound />
                        </span>
                        <span className="text-lg text-danger cursor-pointer active:opacity-50">
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

    return (
        <>

            <Table
                aria-label="Cloud files List"
                selectionMode="multiple"
                topContent={topContent}
                classNames={{
                    base: "overflow-auto",
                }}
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
            <ModalAskPassword isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} onPasswordSubmit={setPassword} selectedFilePath={selectedFilePath} ></ModalAskPassword>
        </>

    );
}

export default LocalFilesList;