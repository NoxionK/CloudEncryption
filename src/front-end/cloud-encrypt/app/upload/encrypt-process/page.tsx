'use client';

import EncryptForm from "@/components/EncryptForm";
import { useFiles } from "@/components/provider/FileProvider";
import { ArrowLeft, PlusIcon, SearchIcon, Trash, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, Input, Button } from "@nextui-org/react";
import toast from "react-hot-toast";
import EncryptedFilesList from "@/components/EncryptedFilesList";
import { set } from "react-hook-form";
import { useEffect } from "react";
import { uploadFile, queryAllFiles } from '@/utils/cloudinary';
import axios from "axios";



// interface EncryptedFile {
//     name: string;
//     type: string;
//     encryptedData: Buffer;
// };

const EncryptProcessPage = () => {

    const { files, encryptedFiles, setFiles, setEncryptedFiles } = useFiles();
    const router = useRouter();

    // useEffect(() => {
    //     console.log("Files: ", files);
    // }, [files]);

    useEffect(() => {
        console.log("Encrypted Files: ", encryptedFiles);
    }, [encryptedFiles]);

    // useEffect(() => {
    //     console.log("useEffect called");
    //     if (password) {
    //         files.forEach(file => {
    //             const fileReader = new FileReader();
    //             //console.log("Encrypting file: ", file.name);
    //             fileReader.onload = function (event) {
    //                 if (!event.target) {
    //                     return;
    //                 }
    //                 const fileData = event.target.result as ArrayBuffer;

    //                 // Encrypt the file data
    //                 const encryptedData = encrypt(Buffer.from(fileData), password);

    //                 setEncryptedFiles(previousFiles => {
    //                     console.log("Previous Files: ", previousFiles);
    //                     return [
    //                     ...previousFiles,
    //                     {
    //                         name: file.name,
    //                         type: file.type,
    //                         encryptedData
    //                     }
    //                 ]});
    //             };

    //             fileReader.readAsArrayBuffer(file);
    //         });
    //     }
    // }, [files]);


    const upLoadToCloudinary = async () => {
        for (const file of encryptedFiles) {
            // Use the file's name as the name for the uploaded file
            await uploadFile(file.encryptedData.toString('base64'), file.name).then(() => {
                toast.success("File uploaded successfully");
                setEncryptedFiles([]);
                setFiles([]);
                router.push('/cloud');
            }).catch((error) => {
                toast.error("Failed to upload file");
            });
        }
    };

    const handleBackToUploadPage = () => {
        setFiles([]);
        setEncryptedFiles([]);
        toast.success("All files removed. Please upload new files.");
        router.push('/upload');
    };

    const query = async () => {
        await queryAllFiles();
    };


    return (

        <div className="flex flex-col w-full h-full px-20 py-10 justify-start space-y-10">
            <div className="flex flex-col justify-center items-center w-full h-full border-2 border-black rounded-3xl px-10 py-6">
                <div className="font-bold text-xl">SYNC TO CLOUDINARY</div>
                <div className="flex flex-col justify-center items-center w-full h-full space-y-4">
                    <div className="flex flex-col space-y-2 bg-white rounded-xl h-[400px] w-full">
                        <EncryptedFilesList></EncryptedFilesList>
                        
                    </div>
                    <div className="flex justify-center space-x-4 w-full">
                        <Button color="danger" variant="ghost" className='font-medium' onClick={handleBackToUploadPage}>Reset</Button>
                        <Button color="primary" className='font-medium' onClick={upLoadToCloudinary}>Upload to Cloudinary </Button>
                        {/* <Button color="primary" className='font-medium' onClick={query}>Query </Button>
                        <Button color="primary" className='font-medium' onClick={query}>Save Files</Button> */}

                    </div>
                   
                </div>
            </div>
        </div>

    );
}

export default EncryptProcessPage;