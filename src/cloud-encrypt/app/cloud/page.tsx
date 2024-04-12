'use client';

import CloudFilesList from "@/components/CloudFilesList";
import FilesList from "@/components/UploadFilesList";
import { Button } from "@nextui-org/react";
import { useEffect } from "react";
import { queryAllFiles } from "@/utils/cloudinary";
import { useFiles } from "@/components/provider/FileProvider";

const CloudStorage = () => {
    const { cloudFiles, setCloudFiles } = useFiles();

    const loadFromCloudinary = async () => {
        const files = await queryAllFiles();
        const newCloudFiles = files.resources.map((file: any) => {
            return {
                name: file.public_id,
                isEncrypted: true,
                bytes: file.bytes,
                url: file.secure_url
            }
        });
        setCloudFiles(newCloudFiles);
    }

    useEffect(() => {
        console.log("Cloud Files: ", cloudFiles);
    }, [cloudFiles]);

    return (
        <div className="flex flex-col w-full h-screen px-20 py-10 justify-start space-y-10">
            <div className="flex flex-col justify-center items-center w-full h-full border-2 border-black rounded-3xl px-10 py-10">
                <div className="font-bold text-xl mb-4">CLOUD STORAGE</div>
                <div className="flex flex-col space-y-2 rounded-xl h-full w-full">
                    <CloudFilesList loadCloudFiles={loadFromCloudinary}></CloudFilesList>
                </div>
            </div>
        </div>
    );
}

export default CloudStorage;