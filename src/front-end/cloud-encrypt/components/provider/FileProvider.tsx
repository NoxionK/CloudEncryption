'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';


interface EncryptedFile {
    name: string;
    type: string;
    encryptedData: Buffer;
};

interface CloudFile {
    name: string;
    isEncrypted: boolean;
    bytes: number;
    url: string;
}

interface IContext {
    files: File[];
    setFiles: React.Dispatch<React.SetStateAction<File[]>>;
    encryptedFiles: EncryptedFile[];
    setEncryptedFiles: React.Dispatch<React.SetStateAction<EncryptedFile[]>>;
    cloudFiles: CloudFile[];
    setCloudFiles: React.Dispatch<React.SetStateAction<CloudFile[]>>;
}


// Create a context
const FilesContext = createContext<IContext | undefined>(undefined);

// Create a provider component
export function FilesProvider({ children }: { children: React.ReactNode }) {
    const [files, setFiles] = useState<File[]>([]);
    const [encryptedFiles, setEncryptedFiles] = useState<EncryptedFile[]>([]);
    const [cloudFiles, setCloudFiles] = useState<CloudFile[]>([]);

    // useEffect(() => {   
    //     console.log('Files Change:', files);
    // }
    // , [files]);

    return (
        <FilesContext.Provider value={{ files, setFiles, encryptedFiles, setEncryptedFiles, cloudFiles, setCloudFiles}}>
            {children}
        </FilesContext.Provider>
    );
}

// Create a custom hook to use the files context
export function useFiles() {
    const context = useContext(FilesContext);
    if (!context) {
        throw new Error('useFiles must be used within a FilesProvider');
    }
    return context;
}