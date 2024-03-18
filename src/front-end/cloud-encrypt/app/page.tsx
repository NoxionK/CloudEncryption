'use client';

import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import { useState } from "react";

const Home = () => {
    const router = useRouter();

    return (
        <div className="flex flex-col justify-center items-center w-full space-y-6">
            <div className="flex flex-col justify-center items-center w-5/6 h-5/6 border-2 border-black rounded-3xl px-10 py-6 space-y-4">
                <div className="flex flex-col justify-center items-center w-full">
                    <h1 className="text-xl font-bold mb-2">Welcome to Cloud Encrypt</h1>
                    <p>This is a cloud storage application that encrypts your files before uploading them to the cloud.</p>
                    <p>Let&apos;s get started by selecting some files on your local machine.</p>
                </div>
                {/* <Button className="bg-transparent hover:bg-green-300 border-2 border-slate-800 font-medium"  radius="sm" onClick={() => router.push('/upload')}>Upload</Button> */}
                <Button color="primary" onClick={() => router.push('/upload')}>Upload</Button>
            </div>
            
        </div>
    );
}

export default Home;