'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';



interface IContext {
    files: File[];
    setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}


// Create a context
const FilesContext = createContext<IContext | undefined>(undefined);

// Create a provider component
export function FilesProvider({ children }: { children: React.ReactNode }) {
    const [files, setFiles] = useState<File[]>([]);

    // useEffect(() => {   
    //     console.log('Files Change:', files);
    // }
    // , [files]);

    return (
        <FilesContext.Provider value={{ files, setFiles }}>
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