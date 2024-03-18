'use client';

import EncryptForm from "@/components/EncryptForm";
import { useFiles } from "@/components/provider/FileProvider";
import { ArrowLeft, PlusIcon, SearchIcon, Trash, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, Input, Button } from "@nextui-org/react";
import FilesList from "@/components/UploadFilesList";
import toast from "react-hot-toast";


const EncryptProcessPage = () => {
    const router = useRouter();

    const upLoadToCloudinary = () => {
        toast.success("Uploading to Cloudinary");
        router.push('/cloud');
    };

    const resetAll = () => {
        toast.success("Reset all");
        router.push('/upload');
    };

    return (

        <div className="flex flex-col w-full h-full px-20 py-10 justify-start space-y-10">
            <div className="flex flex-col justify-center items-center w-full h-full border-2 border-black rounded-3xl px-10 py-6">
                <div className="font-bold text-xl">SYNC TO CLOUDINARY</div>
                <div className="flex flex-col justify-center items-center w-full h-full space-y-4">
                    <div className="flex flex-col space-y-2 bg-white rounded-xl h-[400px] w-full">
                        <FilesList open={() => { }}></FilesList>
                    </div>
                    <div className="flex justify-center space-x-4 w-full">
                        <Button color="danger" variant="ghost" className='font-medium' onClick={resetAll} >Reset all</Button>
                        <Button color="primary" className='font-medium' onClick={upLoadToCloudinary}>Upload to Cloudinary </Button>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default EncryptProcessPage;