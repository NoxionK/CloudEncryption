'use client'

import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, FileSpreadsheetIcon, ArrowRight } from 'lucide-react'
import clsx from 'clsx'
import FilesList from '@/components/UploadFilesList'
import { Button, ButtonGroup } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { useFiles } from '@/components/provider/FileProvider'


const UploadForm = () => {
    const { files, setFiles } = useFiles();
    const [alreadyHasFiles, setAlreadyHasFiles] = useState(false);
    const [existingFiles, setExistingFiles] = useState<File[]>([]);
    const router = useRouter();

    useEffect(() => {
        setAlreadyHasFiles(files.length > 0);
    }, [files]);

    useEffect(() => {
        if (existingFiles.length > 0) {
            toast.error(`The following files already exist: \n - ${existingFiles.map(file => file.name).join('\n - ')}`);
        }
    }, [existingFiles]);


    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles?.length) {
            setExistingFiles([]);
            const newFiles = acceptedFiles.map(file => {
                return Object.assign(file);
            });

            setFiles(previousFiles => [
                ...previousFiles,
                ...newFiles.filter(file => {
                    if (previousFiles.some(f => { return f.name === file.name })) {
                        setExistingFiles(previousFiles => {
                            if (previousFiles.some(existingFile => existingFile.name === file.name)) {
                                return previousFiles;
                            } else {
                                return [...previousFiles, file];
                            }
                        });
                        return false;
                    }
                    return true;
                })
            ])
        }

    }, [])

    const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
        noClick: true,
        onDrop,
    });

    const nextStepHandler = () => {
        if (files.length === 0) {
            toast.error('Please select at least one file to upload');
            return;
        }
        router.push('/upload/encrypt');
    }

    return (
        <div className='w-full h-full flex flex-col space-y-4'>
            <div {...getRootProps(
                {
                    className: clsx(
                        ' w-full h-[400px] p-5 border-2 border-dashed border-gray-500 rounded-xl',
                        isDragActive ? 'bg-sky-200' : 'bg-white'
                    )
                }
            )}>
                <input {...getInputProps()} />
                {alreadyHasFiles && !isDragActive ? (
                    <FilesList open={open}></FilesList>
                ) : (
                    <div className='flex flex-col items-center justify-center gap-4 w-full h-full'>
                        <Upload className='w-8 h-8' />
                        {isDragActive ? (
                            <p>Drop the files here ...</p>
                        ) : (
                            <p>Drag & drop files here, or click the button below to select files</p>
                        )}
                    </div>
                )}

            </div>
            <div className="flex justify-center space-x-4 w-full">
                {!alreadyHasFiles && (
                    <Button color="primary" className='font-medium' onClick={open}>Add New File</Button>
                )}
                {alreadyHasFiles && (
                    <Button color="primary" className='font-medium' onClick={() => {router.push('/upload/encrypt')}}>Next step</Button>
                )}
            </div>
        </div>
    )

}

export default UploadForm;