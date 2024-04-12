'use client';

import { Trash2, Trash, SearchIcon, PlusIcon } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, Input, Button, useDisclosure, Chip } from "@nextui-org/react";
import { useFiles } from "@/components/provider/FileProvider";

interface EncryptedFile {
    name: string;
    type: string;
    encryptedData: Buffer;
};


const EncryptedFilesList = () => {
    const { encryptedFiles, setEncryptedFiles } = useFiles();
    const [isCheckAll, setIsCheckAll] = useState<boolean>(false);
    const [filterValue, setFilterValue] = useState("");
    const [selectedKeys, setSelectedKeys] = useState(new Set<string>([]));
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    // useEffect(() => {
    //     console.log("Selected Keys: ", selectedKeys);
    // }, [selectedKeys]);

    const hasSearchFilter = Boolean(filterValue);

    const filteredItems = useMemo(() => {
        let filteredFiles = [...encryptedFiles];

        if (hasSearchFilter) {
            filteredFiles = filteredFiles.filter((file) =>
                file.name.toLowerCase().includes(filterValue.toLowerCase()),
            );
        }

        return filteredFiles;
    }, [encryptedFiles, filterValue]);


    const columns = [
        {
            key: "fileName",
            title: "File Name"
        },
        {
            key: "type",
            title: "Type"
        },
        // {
        //     key: "size",
        //     title: "Size"
        // },
        {
            key: "actions",
            title: "Actions"
        }
    ];

    const onSearchChange = useCallback((value?: string) => {
        if (value) {
            setFilterValue(value);
        } else {
            setFilterValue("");
        }
    }, []);

    const removeFile = (fileName: string) => {
        setEncryptedFiles(previousFiles => previousFiles.filter(file => file.name !== fileName))
    }

    const removeSelectedFiles = () => {
        if (selectedKeys.size === undefined) {
            setEncryptedFiles([]);
            setSelectedKeys(new Set<string>([]));
        }
        else if (selectedKeys.size != 0) {
            setEncryptedFiles(previousFiles => previousFiles.filter(file => !selectedKeys.has(file.name)));
            setSelectedKeys(new Set<string>([]));
        }
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
                        <Button
                            variant="flat"
                            startContent={<Trash className="w-4 h-4" />}
                            size="sm"
                            onClick={() => removeSelectedFiles()}
                        >
                            Remove
                        </Button>
                        {/* <Button
                            color="primary"
                            startContent={<PlusIcon className="w-4 h-4" />}
                            size="sm"
                            onClick={open}
                        >
                            Add New
                        </Button> */}
                    </div>
                </div>
            </div>
        );
    }, [
        filterValue,
        onSearchChange,
        encryptedFiles.length,
        hasSearchFilter,
        removeSelectedFiles,
    ]);


    const renderCell = useCallback((file: EncryptedFile, columnKey: React.Key) => {
        const cellValue = file[columnKey as keyof EncryptedFile];

        if (typeof cellValue === 'function') {
            return <div>Function</div>;
        }

        switch (columnKey) {
            case "fileName":
                return (
                    <div>{file.name}</div>
                );

            // case "size":
            //     return (
            //         <div>{(file.size / 1024).toFixed(2)} KB</div>
            //     );

            case "type":
                return (
                    <Chip>{file.type}</Chip>
                );

            case "actions":
                return (
                    <div className="relative flex gap-2">
                        <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => { removeFile(file.name) }}>
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
            </div>
        );
    }, [selectedKeys, encryptedFiles.length]);


    return (
        <div className="flex flex-col space-y-2">
            <Table
                aria-label="File List"
                selectionMode="multiple"
                classNames={{
                    base: "max-h-[360px] overflow-auto",
                    wrapper: "bg-transparent",
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
                <TableBody items={filteredItems}>
                    {(item) => (
                        <TableRow key={item.name}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

export default EncryptedFilesList;