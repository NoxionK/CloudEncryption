import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { X, Trash2, Ticket } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

interface ExtendedFile extends File {
    isSelect: boolean;
}

interface FilesListItemProps {
    file: ExtendedFile;
    removeFile: (fileName: string) => void;
    open: () => void;
    isCheckAll: boolean;
    toggleFileSelection: (fileName: string) => void;
}


const FilesListItem = (
    { file, removeFile, open, isCheckAll, toggleFileSelection }: FilesListItemProps
) => {
    const [isCheck, setIsCheck] = useState<boolean>(false);

    useEffect(() => {
        setIsCheck(isCheckAll);
    }, [isCheckAll]);

    useEffect(() => {
        setIsCheck(file.isSelect);
    }, [file]);

    const showFileDescription = () => {
        console.log(file.name);
        console.log(file.size);
        console.log(file.type);
        console.log(file.lastModified);
    };

    const checkFile = () => {
        toggleFileSelection(file.name);
        setIsCheck(!isCheck);
    }

    return (
        <div className="flex h-10">
            <div
                className={clsx(
                    "flex items-center justify-between space-x-2 w-full rounded-lg px-3 hover:bg-sky-100 hover:cursor-pointer", 
                    {"bg-sky-100": isCheck}
                )}
                onDoubleClick={showFileDescription}
            >
                <div className="flex items-center space-x-2 w-full " onClick={checkFile}>
                    <input type={"checkbox"} className="form-checkbox rounded-sm w-4 h-4 hover:cursor-pointer" onChange={checkFile} checked={isCheck}></input>
                    <div className="text-blue-600">
                        {file.name}
                    </div>
                </div>

                <div className="hover:cursor-pointer flex items-center" onClick={(e) => { removeFile(file.name) }}>
                    <Trash2 className="w-6 h-6"></Trash2>
                </div>

            </div>

        </div>
    );
}

export default FilesListItem;