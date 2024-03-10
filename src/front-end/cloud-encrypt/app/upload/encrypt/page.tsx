'use client';

import EncryptForm from "@/components/EncryptForm";
import { Button } from "@nextui-org/react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const EncryptPage = () => {
    const router = useRouter();

    return (
        <div className="flex flex-col w-full h-full justify-center items-center ">
            <div className="flex flex-col w-full h-full px-20 py-10 justify-start space-y-10">
                <div className="flex flex-row w-full">
                    <Button onClick={() => router.push('/upload')} color="primary" variant="ghost" className="font-medium">
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Upload Page
                    </Button>
                </div>
                <div className="flex flex-col justify-center items-center w-full h-full border-2 border-black rounded-3xl px-10 py-6 space-y-4">
                    <div className="flex flex-col justify-center items-center">
                        <div className="text-xl font-bold">DATA ENCRYPT</div>
                        <div className="">In this session, you need to provide a password to encrypt your data.</div>
                        <div className="">Please remember your password. If you forget it, you won&apos;t be able to decrypt your data.</div>
                    </div>

                    <div className="flex flex-col justify-center items-center w-2/3 h-full bg-slate-50 rounded-2xl shadow-md">
                        <EncryptForm></EncryptForm>
                    </div>
                </div>
            </div>

        </div>

    );
}

export default EncryptPage;